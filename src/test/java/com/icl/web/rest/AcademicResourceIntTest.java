package com.icl.web.rest;

import com.icl.PlacementApp;

import com.icl.domain.Academic;
import com.icl.repository.AcademicRepository;
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
 * Test class for the AcademicResource REST controller.
 *
 * @see AcademicResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlacementApp.class)
public class AcademicResourceIntTest {

    private static final String DEFAULT_X_BOARD = "AAAAAAAAAA";
    private static final String UPDATED_X_BOARD = "BBBBBBBBBB";

    private static final String DEFAULT_X_PERCENTAGE = "AAAAAAAAAA";
    private static final String UPDATED_X_PERCENTAGE = "BBBBBBBBBB";

    private static final String DEFAULT_X_YEAR_OF_PASS = "AAAAAAAAAA";
    private static final String UPDATED_X_YEAR_OF_PASS = "BBBBBBBBBB";

    private static final String DEFAULT_XII_BOARD = "AAAAAAAAAA";
    private static final String UPDATED_XII_BOARD = "BBBBBBBBBB";

    private static final String DEFAULT_XII_PERCENTAGE = "AAAAAAAAAA";
    private static final String UPDATED_XII_PERCENTAGE = "BBBBBBBBBB";

    private static final String DEFAULT_XII_YEAR_OF_PASS = "AAAAAAAAAA";
    private static final String UPDATED_XII_YEAR_OF_PASS = "BBBBBBBBBB";

    private static final String DEFAULT_DIP_PERCENTAGE = "AAAAAAAAAA";
    private static final String UPDATED_DIP_PERCENTAGE = "BBBBBBBBBB";

    private static final String DEFAULT_DIP_YEAR_OF_PASS = "AAAAAAAAAA";
    private static final String UPDATED_DIP_YEAR_OF_PASS = "BBBBBBBBBB";

    private static final Integer DEFAULT_CET_RANK = 1;
    private static final Integer UPDATED_CET_RANK = 2;

    private static final Integer DEFAULT_COMEDK_RANK = 1;
    private static final Integer UPDATED_COMEDK_RANK = 2;

    private static final Float DEFAULT_I_SEM = 1F;
    private static final Float UPDATED_I_SEM = 2F;

    private static final Float DEFAULT_II_SEM = 1F;
    private static final Float UPDATED_II_SEM = 2F;

    private static final Float DEFAULT_III_SEM = 1F;
    private static final Float UPDATED_III_SEM = 2F;

    private static final Float DEFAULT_IV_SEM = 1F;
    private static final Float UPDATED_IV_SEM = 2F;

    private static final Float DEFAULT_V_SEM = 1F;
    private static final Float UPDATED_V_SEM = 2F;

    private static final Float DEFAULT_VI_SEM = 1F;
    private static final Float UPDATED_VI_SEM = 2F;

    private static final Float DEFAULT_VII_SEM = 1F;
    private static final Float UPDATED_VII_SEM = 2F;

    private static final Float DEFAULT_VIII_SEM = 1F;
    private static final Float UPDATED_VIII_SEM = 2F;

    private static final Float DEFAULT_IX_SEM = 1F;
    private static final Float UPDATED_IX_SEM = 2F;

    private static final Float DEFAULT_X_SEM = 1F;
    private static final Float UPDATED_X_SEM = 2F;

    private static final Float DEFAULT_CGPA = 1F;
    private static final Float UPDATED_CGPA = 2F;

    private static final Boolean DEFAULT_DISCONTINUED = false;
    private static final Boolean UPDATED_DISCONTINUED = true;

    private static final Boolean DEFAULT_YEAR_BACK = false;
    private static final Boolean UPDATED_YEAR_BACK = true;

    private static final Integer DEFAULT_CURRENT_BACK_LOG = 1;
    private static final Integer UPDATED_CURRENT_BACK_LOG = 2;

    private static final Integer DEFAULT_HISTORY_BACK_LOG = 1;
    private static final Integer UPDATED_HISTORY_BACK_LOG = 2;

    @Autowired
    private AcademicRepository academicRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAcademicMockMvc;

    private Academic academic;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcademicResource academicResource = new AcademicResource(academicRepository);
        this.restAcademicMockMvc = MockMvcBuilders.standaloneSetup(academicResource)
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
    public static Academic createEntity() {
        Academic academic = new Academic()
            .xBoard(DEFAULT_X_BOARD)
            .xPercentage(DEFAULT_X_PERCENTAGE)
            .xYearOfPass(DEFAULT_X_YEAR_OF_PASS)
            .xiiBoard(DEFAULT_XII_BOARD)
            .xiiPercentage(DEFAULT_XII_PERCENTAGE)
            .xiiYearOfPass(DEFAULT_XII_YEAR_OF_PASS)
            .dipPercentage(DEFAULT_DIP_PERCENTAGE)
            .dipYearOfPass(DEFAULT_DIP_YEAR_OF_PASS)
            .cetRank(DEFAULT_CET_RANK)
            .comedkRank(DEFAULT_COMEDK_RANK)
            .iSem(DEFAULT_I_SEM)
            .iiSem(DEFAULT_II_SEM)
            .iiiSem(DEFAULT_III_SEM)
            .ivSem(DEFAULT_IV_SEM)
            .vSem(DEFAULT_V_SEM)
            .viSem(DEFAULT_VI_SEM)
            .viiSem(DEFAULT_VII_SEM)
            .viiiSem(DEFAULT_VIII_SEM)
            .ixSem(DEFAULT_IX_SEM)
            .xSem(DEFAULT_X_SEM)
            .cgpa(DEFAULT_CGPA)
            .discontinued(DEFAULT_DISCONTINUED)
            .yearBack(DEFAULT_YEAR_BACK)
            .currentBackLog(DEFAULT_CURRENT_BACK_LOG)
            .historyBackLog(DEFAULT_HISTORY_BACK_LOG);
        return academic;
    }

    @Before
    public void initTest() {
        academicRepository.deleteAll();
        academic = createEntity();
    }

    @Test
    public void createAcademic() throws Exception {
        int databaseSizeBeforeCreate = academicRepository.findAll().size();

        // Create the Academic
        restAcademicMockMvc.perform(post("/api/academics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academic)))
            .andExpect(status().isCreated());

        // Validate the Academic in the database
        List<Academic> academicList = academicRepository.findAll();
        assertThat(academicList).hasSize(databaseSizeBeforeCreate + 1);
        Academic testAcademic = academicList.get(academicList.size() - 1);
        assertThat(testAcademic.getxBoard()).isEqualTo(DEFAULT_X_BOARD);
        assertThat(testAcademic.getxPercentage()).isEqualTo(DEFAULT_X_PERCENTAGE);
        assertThat(testAcademic.getxYearOfPass()).isEqualTo(DEFAULT_X_YEAR_OF_PASS);
        assertThat(testAcademic.getXiiBoard()).isEqualTo(DEFAULT_XII_BOARD);
        assertThat(testAcademic.getXiiPercentage()).isEqualTo(DEFAULT_XII_PERCENTAGE);
        assertThat(testAcademic.getXiiYearOfPass()).isEqualTo(DEFAULT_XII_YEAR_OF_PASS);
        assertThat(testAcademic.getDipPercentage()).isEqualTo(DEFAULT_DIP_PERCENTAGE);
        assertThat(testAcademic.getDipYearOfPass()).isEqualTo(DEFAULT_DIP_YEAR_OF_PASS);
        assertThat(testAcademic.getCetRank()).isEqualTo(DEFAULT_CET_RANK);
        assertThat(testAcademic.getComedkRank()).isEqualTo(DEFAULT_COMEDK_RANK);
        assertThat(testAcademic.getiSem()).isEqualTo(DEFAULT_I_SEM);
        assertThat(testAcademic.getIiSem()).isEqualTo(DEFAULT_II_SEM);
        assertThat(testAcademic.getIiiSem()).isEqualTo(DEFAULT_III_SEM);
        assertThat(testAcademic.getIvSem()).isEqualTo(DEFAULT_IV_SEM);
        assertThat(testAcademic.getvSem()).isEqualTo(DEFAULT_V_SEM);
        assertThat(testAcademic.getViSem()).isEqualTo(DEFAULT_VI_SEM);
        assertThat(testAcademic.getViiSem()).isEqualTo(DEFAULT_VII_SEM);
        assertThat(testAcademic.getViiiSem()).isEqualTo(DEFAULT_VIII_SEM);
        assertThat(testAcademic.getIxSem()).isEqualTo(DEFAULT_IX_SEM);
        assertThat(testAcademic.getxSem()).isEqualTo(DEFAULT_X_SEM);
        assertThat(testAcademic.getCgpa()).isEqualTo(DEFAULT_CGPA);
        assertThat(testAcademic.isDiscontinued()).isEqualTo(DEFAULT_DISCONTINUED);
        assertThat(testAcademic.isYearBack()).isEqualTo(DEFAULT_YEAR_BACK);
        assertThat(testAcademic.getCurrentBackLog()).isEqualTo(DEFAULT_CURRENT_BACK_LOG);
        assertThat(testAcademic.getHistoryBackLog()).isEqualTo(DEFAULT_HISTORY_BACK_LOG);
    }

    @Test
    public void createAcademicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = academicRepository.findAll().size();

        // Create the Academic with an existing ID
        academic.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcademicMockMvc.perform(post("/api/academics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academic)))
            .andExpect(status().isBadRequest());

        // Validate the Academic in the database
        List<Academic> academicList = academicRepository.findAll();
        assertThat(academicList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAcademics() throws Exception {
        // Initialize the database
        academicRepository.save(academic);

        // Get all the academicList
        restAcademicMockMvc.perform(get("/api/academics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(academic.getId())))
            .andExpect(jsonPath("$.[*].xBoard").value(hasItem(DEFAULT_X_BOARD.toString())))
            .andExpect(jsonPath("$.[*].xPercentage").value(hasItem(DEFAULT_X_PERCENTAGE.toString())))
            .andExpect(jsonPath("$.[*].xYearOfPass").value(hasItem(DEFAULT_X_YEAR_OF_PASS.toString())))
            .andExpect(jsonPath("$.[*].xiiBoard").value(hasItem(DEFAULT_XII_BOARD.toString())))
            .andExpect(jsonPath("$.[*].xiiPercentage").value(hasItem(DEFAULT_XII_PERCENTAGE.toString())))
            .andExpect(jsonPath("$.[*].xiiYearOfPass").value(hasItem(DEFAULT_XII_YEAR_OF_PASS.toString())))
            .andExpect(jsonPath("$.[*].dipPercentage").value(hasItem(DEFAULT_DIP_PERCENTAGE.toString())))
            .andExpect(jsonPath("$.[*].dipYearOfPass").value(hasItem(DEFAULT_DIP_YEAR_OF_PASS.toString())))
            .andExpect(jsonPath("$.[*].cetRank").value(hasItem(DEFAULT_CET_RANK)))
            .andExpect(jsonPath("$.[*].comedkRank").value(hasItem(DEFAULT_COMEDK_RANK)))
            .andExpect(jsonPath("$.[*].iSem").value(hasItem(DEFAULT_I_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].iiSem").value(hasItem(DEFAULT_II_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].iiiSem").value(hasItem(DEFAULT_III_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].ivSem").value(hasItem(DEFAULT_IV_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].vSem").value(hasItem(DEFAULT_V_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].viSem").value(hasItem(DEFAULT_VI_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].viiSem").value(hasItem(DEFAULT_VII_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].viiiSem").value(hasItem(DEFAULT_VIII_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].ixSem").value(hasItem(DEFAULT_IX_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].xSem").value(hasItem(DEFAULT_X_SEM.doubleValue())))
            .andExpect(jsonPath("$.[*].cgpa").value(hasItem(DEFAULT_CGPA.doubleValue())))
            .andExpect(jsonPath("$.[*].discontinued").value(hasItem(DEFAULT_DISCONTINUED.booleanValue())))
            .andExpect(jsonPath("$.[*].yearBack").value(hasItem(DEFAULT_YEAR_BACK.booleanValue())))
            .andExpect(jsonPath("$.[*].currentBackLog").value(hasItem(DEFAULT_CURRENT_BACK_LOG)))
            .andExpect(jsonPath("$.[*].historyBackLog").value(hasItem(DEFAULT_HISTORY_BACK_LOG)));
    }

    @Test
    public void getAcademic() throws Exception {
        // Initialize the database
        academicRepository.save(academic);

        // Get the academic
        restAcademicMockMvc.perform(get("/api/academics/{id}", academic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(academic.getId()))
            .andExpect(jsonPath("$.xBoard").value(DEFAULT_X_BOARD.toString()))
            .andExpect(jsonPath("$.xPercentage").value(DEFAULT_X_PERCENTAGE.toString()))
            .andExpect(jsonPath("$.xYearOfPass").value(DEFAULT_X_YEAR_OF_PASS.toString()))
            .andExpect(jsonPath("$.xiiBoard").value(DEFAULT_XII_BOARD.toString()))
            .andExpect(jsonPath("$.xiiPercentage").value(DEFAULT_XII_PERCENTAGE.toString()))
            .andExpect(jsonPath("$.xiiYearOfPass").value(DEFAULT_XII_YEAR_OF_PASS.toString()))
            .andExpect(jsonPath("$.dipPercentage").value(DEFAULT_DIP_PERCENTAGE.toString()))
            .andExpect(jsonPath("$.dipYearOfPass").value(DEFAULT_DIP_YEAR_OF_PASS.toString()))
            .andExpect(jsonPath("$.cetRank").value(DEFAULT_CET_RANK))
            .andExpect(jsonPath("$.comedkRank").value(DEFAULT_COMEDK_RANK))
            .andExpect(jsonPath("$.iSem").value(DEFAULT_I_SEM.doubleValue()))
            .andExpect(jsonPath("$.iiSem").value(DEFAULT_II_SEM.doubleValue()))
            .andExpect(jsonPath("$.iiiSem").value(DEFAULT_III_SEM.doubleValue()))
            .andExpect(jsonPath("$.ivSem").value(DEFAULT_IV_SEM.doubleValue()))
            .andExpect(jsonPath("$.vSem").value(DEFAULT_V_SEM.doubleValue()))
            .andExpect(jsonPath("$.viSem").value(DEFAULT_VI_SEM.doubleValue()))
            .andExpect(jsonPath("$.viiSem").value(DEFAULT_VII_SEM.doubleValue()))
            .andExpect(jsonPath("$.viiiSem").value(DEFAULT_VIII_SEM.doubleValue()))
            .andExpect(jsonPath("$.ixSem").value(DEFAULT_IX_SEM.doubleValue()))
            .andExpect(jsonPath("$.xSem").value(DEFAULT_X_SEM.doubleValue()))
            .andExpect(jsonPath("$.cgpa").value(DEFAULT_CGPA.doubleValue()))
            .andExpect(jsonPath("$.discontinued").value(DEFAULT_DISCONTINUED.booleanValue()))
            .andExpect(jsonPath("$.yearBack").value(DEFAULT_YEAR_BACK.booleanValue()))
            .andExpect(jsonPath("$.currentBackLog").value(DEFAULT_CURRENT_BACK_LOG))
            .andExpect(jsonPath("$.historyBackLog").value(DEFAULT_HISTORY_BACK_LOG));
    }

    @Test
    public void getNonExistingAcademic() throws Exception {
        // Get the academic
        restAcademicMockMvc.perform(get("/api/academics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAcademic() throws Exception {
        // Initialize the database
        academicRepository.save(academic);
        int databaseSizeBeforeUpdate = academicRepository.findAll().size();

        // Update the academic
        Academic updatedAcademic = academicRepository.findOne(academic.getId());
        updatedAcademic
            .xBoard(UPDATED_X_BOARD)
            .xPercentage(UPDATED_X_PERCENTAGE)
            .xYearOfPass(UPDATED_X_YEAR_OF_PASS)
            .xiiBoard(UPDATED_XII_BOARD)
            .xiiPercentage(UPDATED_XII_PERCENTAGE)
            .xiiYearOfPass(UPDATED_XII_YEAR_OF_PASS)
            .dipPercentage(UPDATED_DIP_PERCENTAGE)
            .dipYearOfPass(UPDATED_DIP_YEAR_OF_PASS)
            .cetRank(UPDATED_CET_RANK)
            .comedkRank(UPDATED_COMEDK_RANK)
            .iSem(UPDATED_I_SEM)
            .iiSem(UPDATED_II_SEM)
            .iiiSem(UPDATED_III_SEM)
            .ivSem(UPDATED_IV_SEM)
            .vSem(UPDATED_V_SEM)
            .viSem(UPDATED_VI_SEM)
            .viiSem(UPDATED_VII_SEM)
            .viiiSem(UPDATED_VIII_SEM)
            .ixSem(UPDATED_IX_SEM)
            .xSem(UPDATED_X_SEM)
            .cgpa(UPDATED_CGPA)
            .discontinued(UPDATED_DISCONTINUED)
            .yearBack(UPDATED_YEAR_BACK)
            .currentBackLog(UPDATED_CURRENT_BACK_LOG)
            .historyBackLog(UPDATED_HISTORY_BACK_LOG);

        restAcademicMockMvc.perform(put("/api/academics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcademic)))
            .andExpect(status().isOk());

        // Validate the Academic in the database
        List<Academic> academicList = academicRepository.findAll();
        assertThat(academicList).hasSize(databaseSizeBeforeUpdate);
        Academic testAcademic = academicList.get(academicList.size() - 1);
        assertThat(testAcademic.getxBoard()).isEqualTo(UPDATED_X_BOARD);
        assertThat(testAcademic.getxPercentage()).isEqualTo(UPDATED_X_PERCENTAGE);
        assertThat(testAcademic.getxYearOfPass()).isEqualTo(UPDATED_X_YEAR_OF_PASS);
        assertThat(testAcademic.getXiiBoard()).isEqualTo(UPDATED_XII_BOARD);
        assertThat(testAcademic.getXiiPercentage()).isEqualTo(UPDATED_XII_PERCENTAGE);
        assertThat(testAcademic.getXiiYearOfPass()).isEqualTo(UPDATED_XII_YEAR_OF_PASS);
        assertThat(testAcademic.getDipPercentage()).isEqualTo(UPDATED_DIP_PERCENTAGE);
        assertThat(testAcademic.getDipYearOfPass()).isEqualTo(UPDATED_DIP_YEAR_OF_PASS);
        assertThat(testAcademic.getCetRank()).isEqualTo(UPDATED_CET_RANK);
        assertThat(testAcademic.getComedkRank()).isEqualTo(UPDATED_COMEDK_RANK);
        assertThat(testAcademic.getiSem()).isEqualTo(UPDATED_I_SEM);
        assertThat(testAcademic.getIiSem()).isEqualTo(UPDATED_II_SEM);
        assertThat(testAcademic.getIiiSem()).isEqualTo(UPDATED_III_SEM);
        assertThat(testAcademic.getIvSem()).isEqualTo(UPDATED_IV_SEM);
        assertThat(testAcademic.getvSem()).isEqualTo(UPDATED_V_SEM);
        assertThat(testAcademic.getViSem()).isEqualTo(UPDATED_VI_SEM);
        assertThat(testAcademic.getViiSem()).isEqualTo(UPDATED_VII_SEM);
        assertThat(testAcademic.getViiiSem()).isEqualTo(UPDATED_VIII_SEM);
        assertThat(testAcademic.getIxSem()).isEqualTo(UPDATED_IX_SEM);
        assertThat(testAcademic.getxSem()).isEqualTo(UPDATED_X_SEM);
        assertThat(testAcademic.getCgpa()).isEqualTo(UPDATED_CGPA);
        assertThat(testAcademic.isDiscontinued()).isEqualTo(UPDATED_DISCONTINUED);
        assertThat(testAcademic.isYearBack()).isEqualTo(UPDATED_YEAR_BACK);
        assertThat(testAcademic.getCurrentBackLog()).isEqualTo(UPDATED_CURRENT_BACK_LOG);
        assertThat(testAcademic.getHistoryBackLog()).isEqualTo(UPDATED_HISTORY_BACK_LOG);
    }

    @Test
    public void updateNonExistingAcademic() throws Exception {
        int databaseSizeBeforeUpdate = academicRepository.findAll().size();

        // Create the Academic

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAcademicMockMvc.perform(put("/api/academics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academic)))
            .andExpect(status().isCreated());

        // Validate the Academic in the database
        List<Academic> academicList = academicRepository.findAll();
        assertThat(academicList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteAcademic() throws Exception {
        // Initialize the database
        academicRepository.save(academic);
        int databaseSizeBeforeDelete = academicRepository.findAll().size();

        // Get the academic
        restAcademicMockMvc.perform(delete("/api/academics/{id}", academic.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Academic> academicList = academicRepository.findAll();
        assertThat(academicList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Academic.class);
        Academic academic1 = new Academic();
        academic1.setId("id1");
        Academic academic2 = new Academic();
        academic2.setId(academic1.getId());
        assertThat(academic1).isEqualTo(academic2);
        academic2.setId("id2");
        assertThat(academic1).isNotEqualTo(academic2);
        academic1.setId(null);
        assertThat(academic1).isNotEqualTo(academic2);
    }
}
