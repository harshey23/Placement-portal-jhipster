package com.icl.web.rest;

import com.icl.PlacementApp;

import com.icl.domain.RoundType;
import com.icl.repository.RoundTypeRepository;
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
 * Test class for the RoundTypeResource REST controller.
 *
 * @see RoundTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlacementApp.class)
public class RoundTypeResourceIntTest {

    private static final String DEFAULT_ROUND_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ROUND_TYPE = "BBBBBBBBBB";

    @Autowired
    private RoundTypeRepository roundTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restRoundTypeMockMvc;

    private RoundType roundType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoundTypeResource roundTypeResource = new RoundTypeResource(roundTypeRepository);
        this.restRoundTypeMockMvc = MockMvcBuilders.standaloneSetup(roundTypeResource)
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
    public static RoundType createEntity() {
        RoundType roundType = new RoundType()
            .roundType(DEFAULT_ROUND_TYPE);
        return roundType;
    }

    @Before
    public void initTest() {
        roundTypeRepository.deleteAll();
        roundType = createEntity();
    }

    @Test
    public void createRoundType() throws Exception {
        int databaseSizeBeforeCreate = roundTypeRepository.findAll().size();

        // Create the RoundType
        restRoundTypeMockMvc.perform(post("/api/round-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roundType)))
            .andExpect(status().isCreated());

        // Validate the RoundType in the database
        List<RoundType> roundTypeList = roundTypeRepository.findAll();
        assertThat(roundTypeList).hasSize(databaseSizeBeforeCreate + 1);
        RoundType testRoundType = roundTypeList.get(roundTypeList.size() - 1);
        assertThat(testRoundType.getRoundType()).isEqualTo(DEFAULT_ROUND_TYPE);
    }

    @Test
    public void createRoundTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roundTypeRepository.findAll().size();

        // Create the RoundType with an existing ID
        roundType.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoundTypeMockMvc.perform(post("/api/round-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roundType)))
            .andExpect(status().isBadRequest());

        // Validate the RoundType in the database
        List<RoundType> roundTypeList = roundTypeRepository.findAll();
        assertThat(roundTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllRoundTypes() throws Exception {
        // Initialize the database
        roundTypeRepository.save(roundType);

        // Get all the roundTypeList
        restRoundTypeMockMvc.perform(get("/api/round-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roundType.getId())))
            .andExpect(jsonPath("$.[*].roundType").value(hasItem(DEFAULT_ROUND_TYPE.toString())));
    }

    @Test
    public void getRoundType() throws Exception {
        // Initialize the database
        roundTypeRepository.save(roundType);

        // Get the roundType
        restRoundTypeMockMvc.perform(get("/api/round-types/{id}", roundType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roundType.getId()))
            .andExpect(jsonPath("$.roundType").value(DEFAULT_ROUND_TYPE.toString()));
    }

    @Test
    public void getNonExistingRoundType() throws Exception {
        // Get the roundType
        restRoundTypeMockMvc.perform(get("/api/round-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRoundType() throws Exception {
        // Initialize the database
        roundTypeRepository.save(roundType);
        int databaseSizeBeforeUpdate = roundTypeRepository.findAll().size();

        // Update the roundType
        RoundType updatedRoundType = roundTypeRepository.findOne(roundType.getId());
        updatedRoundType
            .roundType(UPDATED_ROUND_TYPE);

        restRoundTypeMockMvc.perform(put("/api/round-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoundType)))
            .andExpect(status().isOk());

        // Validate the RoundType in the database
        List<RoundType> roundTypeList = roundTypeRepository.findAll();
        assertThat(roundTypeList).hasSize(databaseSizeBeforeUpdate);
        RoundType testRoundType = roundTypeList.get(roundTypeList.size() - 1);
        assertThat(testRoundType.getRoundType()).isEqualTo(UPDATED_ROUND_TYPE);
    }

    @Test
    public void updateNonExistingRoundType() throws Exception {
        int databaseSizeBeforeUpdate = roundTypeRepository.findAll().size();

        // Create the RoundType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRoundTypeMockMvc.perform(put("/api/round-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roundType)))
            .andExpect(status().isCreated());

        // Validate the RoundType in the database
        List<RoundType> roundTypeList = roundTypeRepository.findAll();
        assertThat(roundTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteRoundType() throws Exception {
        // Initialize the database
        roundTypeRepository.save(roundType);
        int databaseSizeBeforeDelete = roundTypeRepository.findAll().size();

        // Get the roundType
        restRoundTypeMockMvc.perform(delete("/api/round-types/{id}", roundType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RoundType> roundTypeList = roundTypeRepository.findAll();
        assertThat(roundTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoundType.class);
        RoundType roundType1 = new RoundType();
        roundType1.setId("id1");
        RoundType roundType2 = new RoundType();
        roundType2.setId(roundType1.getId());
        assertThat(roundType1).isEqualTo(roundType2);
        roundType2.setId("id2");
        assertThat(roundType1).isNotEqualTo(roundType2);
        roundType1.setId(null);
        assertThat(roundType1).isNotEqualTo(roundType2);
    }
}
