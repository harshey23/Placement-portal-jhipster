package com.icl.web.rest;

import com.icl.PlacementApp;

import com.icl.domain.Company;
import com.icl.repository.CompanyRepository;
import com.icl.service.CompanyService;
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
 * Test class for the CompanyResource REST controller.
 *
 * @see CompanyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlacementApp.class)
public class CompanyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    private static final String DEFAULT_DISCREPTION = "AAAAAAAAAA";
    private static final String UPDATED_DISCREPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PERSON_1 = "AAAAAAAAAA";
    private static final String UPDATED_PERSON_1 = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_1 = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_1 = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_1 = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_1 = "BBBBBBBBBB";

    private static final String DEFAULT_PERSON_2 = "AAAAAAAAAA";
    private static final String UPDATED_PERSON_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_2 = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_2 = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL_2 = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_2 = "BBBBBBBBBB";

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCompanyMockMvc;

    private Company company;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyResource companyResource = new CompanyResource(companyRepository, companyService);
        this.restCompanyMockMvc = MockMvcBuilders.standaloneSetup(companyResource)
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
    public static Company createEntity() {
        Company company = new Company()
            .name(DEFAULT_NAME)
            .website(DEFAULT_WEBSITE)
            .discreption(DEFAULT_DISCREPTION)
            .person1(DEFAULT_PERSON_1)
            .contact1(DEFAULT_CONTACT_1)
            .email1(DEFAULT_EMAIL_1)
            .person2(DEFAULT_PERSON_2)
            .contact2(DEFAULT_CONTACT_2)
            .email2(DEFAULT_EMAIL_2);
        return company;
    }

    @Before
    public void initTest() {
        companyRepository.deleteAll();
        company = createEntity();
    }

    @Test
    public void createCompany() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company
        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isCreated());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate + 1);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCompany.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testCompany.getDiscreption()).isEqualTo(DEFAULT_DISCREPTION);
        assertThat(testCompany.getPerson1()).isEqualTo(DEFAULT_PERSON_1);
        assertThat(testCompany.getContact1()).isEqualTo(DEFAULT_CONTACT_1);
        assertThat(testCompany.getEmail1()).isEqualTo(DEFAULT_EMAIL_1);
        assertThat(testCompany.getPerson2()).isEqualTo(DEFAULT_PERSON_2);
        assertThat(testCompany.getContact2()).isEqualTo(DEFAULT_CONTACT_2);
        assertThat(testCompany.getEmail2()).isEqualTo(DEFAULT_EMAIL_2);
    }

    @Test
    public void createCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company with an existing ID
        company.setName("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isBadRequest());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCompanies() throws Exception {
        // Initialize the database
        companyRepository.save(company);

        // Get all the companyList
        restCompanyMockMvc.perform(get("/api/companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(company.getName())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].discreption").value(hasItem(DEFAULT_DISCREPTION.toString())))
            .andExpect(jsonPath("$.[*].person1").value(hasItem(DEFAULT_PERSON_1.toString())))
            .andExpect(jsonPath("$.[*].contact1").value(hasItem(DEFAULT_CONTACT_1.toString())))
            .andExpect(jsonPath("$.[*].email1").value(hasItem(DEFAULT_EMAIL_1.toString())))
            .andExpect(jsonPath("$.[*].person2").value(hasItem(DEFAULT_PERSON_2.toString())))
            .andExpect(jsonPath("$.[*].contact2").value(hasItem(DEFAULT_CONTACT_2.toString())))
            .andExpect(jsonPath("$.[*].email2").value(hasItem(DEFAULT_EMAIL_2.toString())));
    }

    @Test
    public void getCompany() throws Exception {
        // Initialize the database
        companyRepository.save(company);

        // Get the company
        restCompanyMockMvc.perform(get("/api/companies/{id}", company.getName()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(company.getName()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()))
            .andExpect(jsonPath("$.discreption").value(DEFAULT_DISCREPTION.toString()))
            .andExpect(jsonPath("$.person1").value(DEFAULT_PERSON_1.toString()))
            .andExpect(jsonPath("$.contact1").value(DEFAULT_CONTACT_1.toString()))
            .andExpect(jsonPath("$.email1").value(DEFAULT_EMAIL_1.toString()))
            .andExpect(jsonPath("$.person2").value(DEFAULT_PERSON_2.toString()))
            .andExpect(jsonPath("$.contact2").value(DEFAULT_CONTACT_2.toString()))
            .andExpect(jsonPath("$.email2").value(DEFAULT_EMAIL_2.toString()));
    }

    @Test
    public void getNonExistingCompany() throws Exception {
        // Get the company
        restCompanyMockMvc.perform(get("/api/companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCompany() throws Exception {
        // Initialize the database
        companyRepository.save(company);
        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Update the company
        Company updatedCompany = companyRepository.findOne(company.getName());
        updatedCompany
            .name(UPDATED_NAME)
            .website(UPDATED_WEBSITE)
            .discreption(UPDATED_DISCREPTION)
            .person1(UPDATED_PERSON_1)
            .contact1(UPDATED_CONTACT_1)
            .email1(UPDATED_EMAIL_1)
            .person2(UPDATED_PERSON_2)
            .contact2(UPDATED_CONTACT_2)
            .email2(UPDATED_EMAIL_2);

        restCompanyMockMvc.perform(put("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompany)))
            .andExpect(status().isOk());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCompany.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testCompany.getDiscreption()).isEqualTo(UPDATED_DISCREPTION);
        assertThat(testCompany.getPerson1()).isEqualTo(UPDATED_PERSON_1);
        assertThat(testCompany.getContact1()).isEqualTo(UPDATED_CONTACT_1);
        assertThat(testCompany.getEmail1()).isEqualTo(UPDATED_EMAIL_1);
        assertThat(testCompany.getPerson2()).isEqualTo(UPDATED_PERSON_2);
        assertThat(testCompany.getContact2()).isEqualTo(UPDATED_CONTACT_2);
        assertThat(testCompany.getEmail2()).isEqualTo(UPDATED_EMAIL_2);
    }

    @Test
    public void updateNonExistingCompany() throws Exception {
        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Create the Company

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCompanyMockMvc.perform(put("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(company)))
            .andExpect(status().isCreated());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteCompany() throws Exception {
        // Initialize the database
        companyRepository.save(company);
        int databaseSizeBeforeDelete = companyRepository.findAll().size();

        // Get the company
        restCompanyMockMvc.perform(delete("/api/companies/{id}", company.getName())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Company.class);
        Company company1 = new Company();
        company1.setName("id1");
        Company company2 = new Company();
        company2.setName(company1.getName());
        assertThat(company1).isEqualTo(company2);
        company2.setName("id2");
        assertThat(company1).isNotEqualTo(company2);
        company1.setName(null);
        assertThat(company1).isNotEqualTo(company2);
    }
}
