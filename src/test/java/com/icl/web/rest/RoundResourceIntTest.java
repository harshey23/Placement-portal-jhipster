package com.icl.web.rest;

import com.icl.PlacementApp;

import com.icl.domain.Round;
import com.icl.repository.RoundRepository;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.icl.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RoundResource REST controller.
 *
 * @see RoundResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlacementApp.class)
public class RoundResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    private static final String DEFAULT_DISCREPTION = "AAAAAAAAAA";
    private static final String UPDATED_DISCREPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RoundRepository roundRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restRoundMockMvc;

    private Round round;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoundResource roundResource = new RoundResource(roundRepository);
        this.restRoundMockMvc = MockMvcBuilders.standaloneSetup(roundResource)
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
    public static Round createEntity() {
        Round round = new Round()
            .name(DEFAULT_NAME)
            .number(DEFAULT_NUMBER)
            .description(DEFAULT_DISCREPTION)
            .date(DEFAULT_DATE);
        return round;
    }

    @Before
    public void initTest() {
        roundRepository.deleteAll();
        round = createEntity();
    }

    @Test
    public void createRound() throws Exception {
        int databaseSizeBeforeCreate = roundRepository.findAll().size();

        // Create the Round
        restRoundMockMvc.perform(post("/api/rounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(round)))
            .andExpect(status().isCreated());

        // Validate the Round in the database
        List<Round> roundList = roundRepository.findAll();
        assertThat(roundList).hasSize(databaseSizeBeforeCreate + 1);
        Round testRound = roundList.get(roundList.size() - 1);
        assertThat(testRound.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRound.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testRound.getDescription()).isEqualTo(DEFAULT_DISCREPTION);
        assertThat(testRound.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    public void createRoundWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roundRepository.findAll().size();

        // Create the Round with an existing ID
        round.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoundMockMvc.perform(post("/api/rounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(round)))
            .andExpect(status().isBadRequest());

        // Validate the Round in the database
        List<Round> roundList = roundRepository.findAll();
        assertThat(roundList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllRounds() throws Exception {
        // Initialize the database
        roundRepository.save(round);

        // Get all the roundList
        restRoundMockMvc.perform(get("/api/rounds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(round.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DISCREPTION.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    public void getRound() throws Exception {
        // Initialize the database
        roundRepository.save(round);

        // Get the round
        restRoundMockMvc.perform(get("/api/rounds/{id}", round.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(round.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.description").value(DEFAULT_DISCREPTION.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    public void getNonExistingRound() throws Exception {
        // Get the round
        restRoundMockMvc.perform(get("/api/rounds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRound() throws Exception {
        // Initialize the database
        roundRepository.save(round);
        int databaseSizeBeforeUpdate = roundRepository.findAll().size();

        // Update the round
        Round updatedRound = roundRepository.findOne(round.getId());
        updatedRound
            .name(UPDATED_NAME)
            .number(UPDATED_NUMBER)
            .description(UPDATED_DISCREPTION)
            .date(UPDATED_DATE);

        restRoundMockMvc.perform(put("/api/rounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRound)))
            .andExpect(status().isOk());

        // Validate the Round in the database
        List<Round> roundList = roundRepository.findAll();
        assertThat(roundList).hasSize(databaseSizeBeforeUpdate);
        Round testRound = roundList.get(roundList.size() - 1);
        assertThat(testRound.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRound.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testRound.getDescription()).isEqualTo(UPDATED_DISCREPTION);
        assertThat(testRound.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    public void updateNonExistingRound() throws Exception {
        int databaseSizeBeforeUpdate = roundRepository.findAll().size();

        // Create the Round

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRoundMockMvc.perform(put("/api/rounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(round)))
            .andExpect(status().isCreated());

        // Validate the Round in the database
        List<Round> roundList = roundRepository.findAll();
        assertThat(roundList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteRound() throws Exception {
        // Initialize the database
        roundRepository.save(round);
        int databaseSizeBeforeDelete = roundRepository.findAll().size();

        // Get the round
        restRoundMockMvc.perform(delete("/api/rounds/{id}", round.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Round> roundList = roundRepository.findAll();
        assertThat(roundList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Round.class);
        Round round1 = new Round();
        round1.setId("id1");
        Round round2 = new Round();
        round2.setId(round1.getId());
        assertThat(round1).isEqualTo(round2);
        round2.setId("id2");
        assertThat(round1).isNotEqualTo(round2);
        round1.setId(null);
        assertThat(round1).isNotEqualTo(round2);
    }
}
