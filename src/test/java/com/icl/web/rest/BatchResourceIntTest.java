package com.icl.web.rest;

import com.icl.PlacementApp;

import com.icl.domain.Batch;
import com.icl.repository.BatchRepository;
import com.icl.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static com.icl.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BatchResource REST controller.
 *
 * @see BatchResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlacementApp.class)
public class BatchResourceIntTest {

    private static final String DEFAULT_BATCH = "AAAAAAAAAA";
    private static final String UPDATED_BATCH = "BBBBBBBBBB";

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restBatchMockMvc;

    private Batch batch;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BatchResource batchResource = new BatchResource(batchRepository);
        this.restBatchMockMvc = MockMvcBuilders.standaloneSetup(batchResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Batch createEntity() {
        Batch batch = new Batch()
            .batch(DEFAULT_BATCH);
        return batch;
    }

    @Before
    public void initTest() {
        batchRepository.deleteAll();
        batch = createEntity();
    }

    @Test
    public void createBatch() throws Exception {
        int databaseSizeBeforeCreate = batchRepository.findAll().size();

        // Create the Batch
        restBatchMockMvc.perform(post("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batch)))
            .andExpect(status().isCreated());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeCreate + 1);
        Batch testBatch = batchList.get(batchList.size() - 1);
        assertThat(testBatch.getBatch()).isEqualTo(DEFAULT_BATCH);
    }

    @Test
    public void createBatchWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = batchRepository.findAll().size();

        // Create the Batch with an existing ID
        batch.setBatch("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restBatchMockMvc.perform(post("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batch)))
            .andExpect(status().isBadRequest());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllBatches() throws Exception {
        // Initialize the database
        batchRepository.save(batch);

        // Get all the batchList
        restBatchMockMvc.perform(get("/api/batches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(batch.getBatch())))
            .andExpect(jsonPath("$.[*].batch").value(hasItem(DEFAULT_BATCH.toString())));
    }

    @Test
    public void getBatch() throws Exception {
        // Initialize the database
        batchRepository.save(batch);

        // Get the batch
        restBatchMockMvc.perform(get("/api/batches/{id}", batch.getBatch()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(batch.getBatch()))
            .andExpect(jsonPath("$.batch").value(DEFAULT_BATCH.toString()));
    }

    @Test
    public void getNonExistingBatch() throws Exception {
        // Get the batch
        restBatchMockMvc.perform(get("/api/batches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateBatch() throws Exception {
        // Initialize the database
        batchRepository.save(batch);
        int databaseSizeBeforeUpdate = batchRepository.findAll().size();

        // Update the batch
        Batch updatedBatch = batchRepository.findOne(batch.getBatch());
        updatedBatch
            .batch(UPDATED_BATCH);

        restBatchMockMvc.perform(put("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBatch)))
            .andExpect(status().isOk());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeUpdate);
        Batch testBatch = batchList.get(batchList.size() - 1);
        assertThat(testBatch.getBatch()).isEqualTo(UPDATED_BATCH);
    }

    @Test
    public void updateNonExistingBatch() throws Exception {
        int databaseSizeBeforeUpdate = batchRepository.findAll().size();

        // Create the Batch

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBatchMockMvc.perform(put("/api/batches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(batch)))
            .andExpect(status().isCreated());

        // Validate the Batch in the database
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteBatch() throws Exception {
        // Initialize the database
        batchRepository.save(batch);
        int databaseSizeBeforeDelete = batchRepository.findAll().size();

        // Get the batch
        restBatchMockMvc.perform(delete("/api/batches/{id}", batch.getBatch())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Batch> batchList = batchRepository.findAll();
        assertThat(batchList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Batch.class);
        Batch batch1 = new Batch();
        batch1.setBatch("id1");
        Batch batch2 = new Batch();
        batch2.setBatch(batch1.getBatch());
        assertThat(batch1).isEqualTo(batch2);
        batch2.setBatch("id2");
        assertThat(batch1).isNotEqualTo(batch2);
        batch1.setBatch(null);
        assertThat(batch1).isNotEqualTo(batch2);
    }
}
