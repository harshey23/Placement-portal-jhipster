package com.icl.web.rest;

import com.icl.PlacementApp;

import com.icl.domain.CompanyType;
import com.icl.repository.CompanyTypeRepository;
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
 * Test class for the CompanyTypeResource REST controller.
 *
 * @see CompanyTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlacementApp.class)
public class CompanyTypeResourceIntTest {

    private static final String DEFAULT_COMPANY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_TYPE = "BBBBBBBBBB";

    @Autowired
    private CompanyTypeRepository companyTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCompanyTypeMockMvc;

    private CompanyType companyType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyTypeResource companyTypeResource = new CompanyTypeResource(companyTypeRepository);
        this.restCompanyTypeMockMvc = MockMvcBuilders.standaloneSetup(companyTypeResource)
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
    public static CompanyType createEntity() {
        CompanyType companyType = new CompanyType()
            .companyType(DEFAULT_COMPANY_TYPE);
        return companyType;
    }

    @Before
    public void initTest() {
        companyTypeRepository.deleteAll();
        companyType = createEntity();
    }

    @Test
    public void createCompanyType() throws Exception {
        int databaseSizeBeforeCreate = companyTypeRepository.findAll().size();

        // Create the CompanyType
        restCompanyTypeMockMvc.perform(post("/api/company-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyType)))
            .andExpect(status().isCreated());

        // Validate the CompanyType in the database
        List<CompanyType> companyTypeList = companyTypeRepository.findAll();
        assertThat(companyTypeList).hasSize(databaseSizeBeforeCreate + 1);
        CompanyType testCompanyType = companyTypeList.get(companyTypeList.size() - 1);
        assertThat(testCompanyType.getCompanyType()).isEqualTo(DEFAULT_COMPANY_TYPE);
    }

    @Test
    public void createCompanyTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyTypeRepository.findAll().size();

        // Create the CompanyType with an existing ID
        companyType.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyTypeMockMvc.perform(post("/api/company-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyType)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyType in the database
        List<CompanyType> companyTypeList = companyTypeRepository.findAll();
        assertThat(companyTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCompanyTypes() throws Exception {
        // Initialize the database
        companyTypeRepository.save(companyType);

        // Get all the companyTypeList
        restCompanyTypeMockMvc.perform(get("/api/company-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companyType.getId())))
            .andExpect(jsonPath("$.[*].companyType").value(hasItem(DEFAULT_COMPANY_TYPE.toString())));
    }

    @Test
    public void getCompanyType() throws Exception {
        // Initialize the database
        companyTypeRepository.save(companyType);

        // Get the companyType
        restCompanyTypeMockMvc.perform(get("/api/company-types/{id}", companyType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companyType.getId()))
            .andExpect(jsonPath("$.companyType").value(DEFAULT_COMPANY_TYPE.toString()));
    }

    @Test
    public void getNonExistingCompanyType() throws Exception {
        // Get the companyType
        restCompanyTypeMockMvc.perform(get("/api/company-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCompanyType() throws Exception {
        // Initialize the database
        companyTypeRepository.save(companyType);
        int databaseSizeBeforeUpdate = companyTypeRepository.findAll().size();

        // Update the companyType
        CompanyType updatedCompanyType = companyTypeRepository.findOne(companyType.getId());
        updatedCompanyType
            .companyType(UPDATED_COMPANY_TYPE);

        restCompanyTypeMockMvc.perform(put("/api/company-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanyType)))
            .andExpect(status().isOk());

        // Validate the CompanyType in the database
        List<CompanyType> companyTypeList = companyTypeRepository.findAll();
        assertThat(companyTypeList).hasSize(databaseSizeBeforeUpdate);
        CompanyType testCompanyType = companyTypeList.get(companyTypeList.size() - 1);
        assertThat(testCompanyType.getCompanyType()).isEqualTo(UPDATED_COMPANY_TYPE);
    }

    @Test
    public void updateNonExistingCompanyType() throws Exception {
        int databaseSizeBeforeUpdate = companyTypeRepository.findAll().size();

        // Create the CompanyType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCompanyTypeMockMvc.perform(put("/api/company-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyType)))
            .andExpect(status().isCreated());

        // Validate the CompanyType in the database
        List<CompanyType> companyTypeList = companyTypeRepository.findAll();
        assertThat(companyTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteCompanyType() throws Exception {
        // Initialize the database
        companyTypeRepository.save(companyType);
        int databaseSizeBeforeDelete = companyTypeRepository.findAll().size();

        // Get the companyType
        restCompanyTypeMockMvc.perform(delete("/api/company-types/{id}", companyType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompanyType> companyTypeList = companyTypeRepository.findAll();
        assertThat(companyTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyType.class);
        CompanyType companyType1 = new CompanyType();
        companyType1.setId("id1");
        CompanyType companyType2 = new CompanyType();
        companyType2.setId(companyType1.getId());
        assertThat(companyType1).isEqualTo(companyType2);
        companyType2.setId("id2");
        assertThat(companyType1).isNotEqualTo(companyType2);
        companyType1.setId(null);
        assertThat(companyType1).isNotEqualTo(companyType2);
    }
}
