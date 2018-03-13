package com.icl.web.rest;

import com.icl.PlacementApp;

import com.icl.domain.Mytry;
import com.icl.repository.MytryRepository;
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
import org.springframework.util.Base64Utils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.icl.web.rest.TestUtil.sameInstant;
import static com.icl.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MytryResource REST controller.
 *
 * @see MytryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlacementApp.class)
public class MytryResourceIntTest {

    private static final String DEFAULT_S = "AAAAAAAAAA";
    private static final String UPDATED_S = "BBBBBBBBBB";

    private static final Integer DEFAULT_I = 1;
    private static final Integer UPDATED_I = 2;

    private static final Long DEFAULT_L = 1L;
    private static final Long UPDATED_L = 2L;

    private static final Float DEFAULT_F = 1F;
    private static final Float UPDATED_F = 2F;

    private static final Double DEFAULT_D = 1D;
    private static final Double UPDATED_D = 2D;

    private static final BigDecimal DEFAULT_BD = new BigDecimal(1);
    private static final BigDecimal UPDATED_BD = new BigDecimal(2);

    private static final LocalDate DEFAULT_LD = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LD = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_INST = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INST = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ZonedDateTime DEFAULT_ZDT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ZDT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_B = false;
    private static final Boolean UPDATED_B = true;

    private static final byte[] DEFAULT_BL = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BL = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_BL_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BL_CONTENT_TYPE = "image/png";

    @Autowired
    private MytryRepository mytryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restMytryMockMvc;

    private Mytry mytry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MytryResource mytryResource = new MytryResource(mytryRepository);
        this.restMytryMockMvc = MockMvcBuilders.standaloneSetup(mytryResource)
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
    public static Mytry createEntity() {
        Mytry mytry = new Mytry()
            .s(DEFAULT_S)
            .i(DEFAULT_I)
            .l(DEFAULT_L)
            .f(DEFAULT_F)
            .d(DEFAULT_D)
            .bd(DEFAULT_BD)
            .ld(DEFAULT_LD)
            .inst(DEFAULT_INST)
            .zdt(DEFAULT_ZDT)
            .b(DEFAULT_B)
            .bl(DEFAULT_BL)
            .blContentType(DEFAULT_BL_CONTENT_TYPE);
        return mytry;
    }

    @Before
    public void initTest() {
        mytryRepository.deleteAll();
        mytry = createEntity();
    }

    @Test
    public void createMytry() throws Exception {
        int databaseSizeBeforeCreate = mytryRepository.findAll().size();

        // Create the Mytry
        restMytryMockMvc.perform(post("/api/mytries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mytry)))
            .andExpect(status().isCreated());

        // Validate the Mytry in the database
        List<Mytry> mytryList = mytryRepository.findAll();
        assertThat(mytryList).hasSize(databaseSizeBeforeCreate + 1);
        Mytry testMytry = mytryList.get(mytryList.size() - 1);
        assertThat(testMytry.getS()).isEqualTo(DEFAULT_S);
        assertThat(testMytry.getI()).isEqualTo(DEFAULT_I);
        assertThat(testMytry.getL()).isEqualTo(DEFAULT_L);
        assertThat(testMytry.getF()).isEqualTo(DEFAULT_F);
        assertThat(testMytry.getD()).isEqualTo(DEFAULT_D);
        assertThat(testMytry.getBd()).isEqualTo(DEFAULT_BD);
        assertThat(testMytry.getLd()).isEqualTo(DEFAULT_LD);
        assertThat(testMytry.getInst()).isEqualTo(DEFAULT_INST);
        assertThat(testMytry.getZdt()).isEqualTo(DEFAULT_ZDT);
        assertThat(testMytry.isB()).isEqualTo(DEFAULT_B);
        assertThat(testMytry.getBl()).isEqualTo(DEFAULT_BL);
        assertThat(testMytry.getBlContentType()).isEqualTo(DEFAULT_BL_CONTENT_TYPE);
    }

    @Test
    public void createMytryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mytryRepository.findAll().size();

        // Create the Mytry with an existing ID
        mytry.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMytryMockMvc.perform(post("/api/mytries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mytry)))
            .andExpect(status().isBadRequest());

        // Validate the Mytry in the database
        List<Mytry> mytryList = mytryRepository.findAll();
        assertThat(mytryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllMytries() throws Exception {
        // Initialize the database
        mytryRepository.save(mytry);

        // Get all the mytryList
        restMytryMockMvc.perform(get("/api/mytries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mytry.getId())))
            .andExpect(jsonPath("$.[*].s").value(hasItem(DEFAULT_S.toString())))
            .andExpect(jsonPath("$.[*].i").value(hasItem(DEFAULT_I)))
            .andExpect(jsonPath("$.[*].l").value(hasItem(DEFAULT_L.intValue())))
            .andExpect(jsonPath("$.[*].f").value(hasItem(DEFAULT_F.doubleValue())))
            .andExpect(jsonPath("$.[*].d").value(hasItem(DEFAULT_D.doubleValue())))
            .andExpect(jsonPath("$.[*].bd").value(hasItem(DEFAULT_BD.intValue())))
            .andExpect(jsonPath("$.[*].ld").value(hasItem(DEFAULT_LD.toString())))
            .andExpect(jsonPath("$.[*].inst").value(hasItem(DEFAULT_INST.toString())))
            .andExpect(jsonPath("$.[*].zdt").value(hasItem(sameInstant(DEFAULT_ZDT))))
            .andExpect(jsonPath("$.[*].b").value(hasItem(DEFAULT_B.booleanValue())))
            .andExpect(jsonPath("$.[*].blContentType").value(hasItem(DEFAULT_BL_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bl").value(hasItem(Base64Utils.encodeToString(DEFAULT_BL))));
    }

    @Test
    public void getMytry() throws Exception {
        // Initialize the database
        mytryRepository.save(mytry);

        // Get the mytry
        restMytryMockMvc.perform(get("/api/mytries/{id}", mytry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mytry.getId()))
            .andExpect(jsonPath("$.s").value(DEFAULT_S.toString()))
            .andExpect(jsonPath("$.i").value(DEFAULT_I))
            .andExpect(jsonPath("$.l").value(DEFAULT_L.intValue()))
            .andExpect(jsonPath("$.f").value(DEFAULT_F.doubleValue()))
            .andExpect(jsonPath("$.d").value(DEFAULT_D.doubleValue()))
            .andExpect(jsonPath("$.bd").value(DEFAULT_BD.intValue()))
            .andExpect(jsonPath("$.ld").value(DEFAULT_LD.toString()))
            .andExpect(jsonPath("$.inst").value(DEFAULT_INST.toString()))
            .andExpect(jsonPath("$.zdt").value(sameInstant(DEFAULT_ZDT)))
            .andExpect(jsonPath("$.b").value(DEFAULT_B.booleanValue()))
            .andExpect(jsonPath("$.blContentType").value(DEFAULT_BL_CONTENT_TYPE))
            .andExpect(jsonPath("$.bl").value(Base64Utils.encodeToString(DEFAULT_BL)));
    }

    @Test
    public void getNonExistingMytry() throws Exception {
        // Get the mytry
        restMytryMockMvc.perform(get("/api/mytries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMytry() throws Exception {
        // Initialize the database
        mytryRepository.save(mytry);
        int databaseSizeBeforeUpdate = mytryRepository.findAll().size();

        // Update the mytry
        Mytry updatedMytry = mytryRepository.findOne(mytry.getId());
        updatedMytry
            .s(UPDATED_S)
            .i(UPDATED_I)
            .l(UPDATED_L)
            .f(UPDATED_F)
            .d(UPDATED_D)
            .bd(UPDATED_BD)
            .ld(UPDATED_LD)
            .inst(UPDATED_INST)
            .zdt(UPDATED_ZDT)
            .b(UPDATED_B)
            .bl(UPDATED_BL)
            .blContentType(UPDATED_BL_CONTENT_TYPE);

        restMytryMockMvc.perform(put("/api/mytries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMytry)))
            .andExpect(status().isOk());

        // Validate the Mytry in the database
        List<Mytry> mytryList = mytryRepository.findAll();
        assertThat(mytryList).hasSize(databaseSizeBeforeUpdate);
        Mytry testMytry = mytryList.get(mytryList.size() - 1);
        assertThat(testMytry.getS()).isEqualTo(UPDATED_S);
        assertThat(testMytry.getI()).isEqualTo(UPDATED_I);
        assertThat(testMytry.getL()).isEqualTo(UPDATED_L);
        assertThat(testMytry.getF()).isEqualTo(UPDATED_F);
        assertThat(testMytry.getD()).isEqualTo(UPDATED_D);
        assertThat(testMytry.getBd()).isEqualTo(UPDATED_BD);
        assertThat(testMytry.getLd()).isEqualTo(UPDATED_LD);
        assertThat(testMytry.getInst()).isEqualTo(UPDATED_INST);
        assertThat(testMytry.getZdt()).isEqualTo(UPDATED_ZDT);
        assertThat(testMytry.isB()).isEqualTo(UPDATED_B);
        assertThat(testMytry.getBl()).isEqualTo(UPDATED_BL);
        assertThat(testMytry.getBlContentType()).isEqualTo(UPDATED_BL_CONTENT_TYPE);
    }

    @Test
    public void updateNonExistingMytry() throws Exception {
        int databaseSizeBeforeUpdate = mytryRepository.findAll().size();

        // Create the Mytry

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMytryMockMvc.perform(put("/api/mytries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mytry)))
            .andExpect(status().isCreated());

        // Validate the Mytry in the database
        List<Mytry> mytryList = mytryRepository.findAll();
        assertThat(mytryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteMytry() throws Exception {
        // Initialize the database
        mytryRepository.save(mytry);
        int databaseSizeBeforeDelete = mytryRepository.findAll().size();

        // Get the mytry
        restMytryMockMvc.perform(delete("/api/mytries/{id}", mytry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mytry> mytryList = mytryRepository.findAll();
        assertThat(mytryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mytry.class);
        Mytry mytry1 = new Mytry();
        mytry1.setId("id1");
        Mytry mytry2 = new Mytry();
        mytry2.setId(mytry1.getId());
        assertThat(mytry1).isEqualTo(mytry2);
        mytry2.setId("id2");
        assertThat(mytry1).isNotEqualTo(mytry2);
        mytry1.setId(null);
        assertThat(mytry1).isNotEqualTo(mytry2);
    }
}
