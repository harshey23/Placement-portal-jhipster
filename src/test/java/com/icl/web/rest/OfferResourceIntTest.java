//package com.icl.web.rest;
//
//import com.icl.PlacementApp;
//
//import com.icl.domain.Offer;
//import com.icl.repository.OfferRepository;
//import com.icl.web.rest.errors.ExceptionTranslator;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.time.LocalDate;
//import java.time.Instant;
//import java.time.ZoneId;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//
//import static com.icl.web.rest.TestUtil.createFormattingConversionService;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.Matchers.hasItem;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
///**
// * Test class for the OfferResource REST controller.
// *
// * @see OfferResource
// */
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes = PlacementApp.class)
//public class OfferResourceIntTest {
//
//    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
//    private static final String UPDATED_TITLE = "BBBBBBBBBB";
//
//    private static final Integer DEFAULT_PACKAGE_OFFERED = 1;
//    private static final Integer UPDATED_PACKAGE_OFFERED = 2;
//
//    private static final String DEFAULT_DISCREPTION = "AAAAAAAAAA";
//    private static final String UPDATED_DISCREPTION = "BBBBBBBBBB";
//
//    private static final LocalDate DEFAULT_DATE_OF_VISIT = LocalDate.ofEpochDay(0L);
//    private static final LocalDate UPDATED_DATE_OF_VISIT = LocalDate.now(ZoneId.systemDefault());
//
//    private static final Instant DEFAULT_LAST_DATE = Instant.ofEpochMilli(0L);
//    private static final Instant UPDATED_LAST_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
//
//    private static final String DEFAULT_PLACE = "AAAAAAAAAA";
//    private static final String UPDATED_PLACE = "BBBBBBBBBB";
//
//    @Autowired
//    private OfferRepository offerRepository;
//
//    @Autowired
//    private MappingJackson2HttpMessageConverter jacksonMessageConverter;
//
//    @Autowired
//    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;
//
//    @Autowired
//    private ExceptionTranslator exceptionTranslator;
//
//    private MockMvc restOfferMockMvc;
//
//    private Offer offer;
//
//    @Before
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        final OfferResource offerResource = new OfferResource(offerRepository);
//        this.restOfferMockMvc = MockMvcBuilders.standaloneSetup(offerResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static Offer createEntity() {
//        Offer offer = new Offer()
//            .title(DEFAULT_TITLE)
//            .packageOffered(DEFAULT_PACKAGE_OFFERED)
//            .discreption(DEFAULT_DISCREPTION)
//            .dateOfVisit(DEFAULT_DATE_OF_VISIT)
//            .lastDate(DEFAULT_LAST_DATE)
//            .place(DEFAULT_PLACE);
//        return offer;
//    }
//
//    @Before
//    public void initTest() {
//        offerRepository.deleteAll();
//        offer = createEntity();
//    }
//
//    @Test
//    public void createOffer() throws Exception {
//        int databaseSizeBeforeCreate = offerRepository.findAll().size();
//
//        // Create the Offer
//        restOfferMockMvc.perform(post("/api/offers")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(offer)))
//            .andExpect(status().isCreated());
//
//        // Validate the Offer in the database
//        List<Offer> offerList = offerRepository.findAll();
//        assertThat(offerList).hasSize(databaseSizeBeforeCreate + 1);
//        Offer testOffer = offerList.get(offerList.size() - 1);
//        assertThat(testOffer.getTitle()).isEqualTo(DEFAULT_TITLE);
//        assertThat(testOffer.getPackageOffered()).isEqualTo(DEFAULT_PACKAGE_OFFERED);
//        assertThat(testOffer.getDiscreption()).isEqualTo(DEFAULT_DISCREPTION);
//        assertThat(testOffer.getDateOfVisit()).isEqualTo(DEFAULT_DATE_OF_VISIT);
//        assertThat(testOffer.getLastDate()).isEqualTo(DEFAULT_LAST_DATE);
//        assertThat(testOffer.getPlace()).isEqualTo(DEFAULT_PLACE);
//    }
//
//    @Test
//    public void createOfferWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = offerRepository.findAll().size();
//
//        // Create the Offer with an existing ID
//        offer.setId("existing_id");
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restOfferMockMvc.perform(post("/api/offers")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(offer)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the Offer in the database
//        List<Offer> offerList = offerRepository.findAll();
//        assertThat(offerList).hasSize(databaseSizeBeforeCreate);
//    }
//
//    @Test
//    public void getAllOffers() throws Exception {
//        // Initialize the database
//        offerRepository.save(offer);
//
//        // Get all the offerList
//        restOfferMockMvc.perform(get("/api/offers?sort=id,desc"))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.[*].id").value(hasItem(offer.getId())))
//            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
//            .andExpect(jsonPath("$.[*].packageOffered").value(hasItem(DEFAULT_PACKAGE_OFFERED)))
//            .andExpect(jsonPath("$.[*].discreption").value(hasItem(DEFAULT_DISCREPTION.toString())))
//            .andExpect(jsonPath("$.[*].dateOfVisit").value(hasItem(DEFAULT_DATE_OF_VISIT.toString())))
//            .andExpect(jsonPath("$.[*].lastDate").value(hasItem(DEFAULT_LAST_DATE.toString())))
//            .andExpect(jsonPath("$.[*].place").value(hasItem(DEFAULT_PLACE.toString())));
//    }
//
//    @Test
//    public void getOffer() throws Exception {
//        // Initialize the database
//        offerRepository.save(offer);
//
//        // Get the offer
//        restOfferMockMvc.perform(get("/api/offers/{id}", offer.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(offer.getId()))
//            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
//            .andExpect(jsonPath("$.packageOffered").value(DEFAULT_PACKAGE_OFFERED))
//            .andExpect(jsonPath("$.discreption").value(DEFAULT_DISCREPTION.toString()))
//            .andExpect(jsonPath("$.dateOfVisit").value(DEFAULT_DATE_OF_VISIT.toString()))
//            .andExpect(jsonPath("$.lastDate").value(DEFAULT_LAST_DATE.toString()))
//            .andExpect(jsonPath("$.place").value(DEFAULT_PLACE.toString()));
//    }
//
//    @Test
//    public void getNonExistingOffer() throws Exception {
//        // Get the offer
//        restOfferMockMvc.perform(get("/api/offers/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    public void updateOffer() throws Exception {
//        // Initialize the database
//        offerRepository.save(offer);
//        int databaseSizeBeforeUpdate = offerRepository.findAll().size();
//
//        // Update the offer
//        Offer updatedOffer = offerRepository.findOne(offer.getId());
//        updatedOffer
//            .title(UPDATED_TITLE)
//            .packageOffered(UPDATED_PACKAGE_OFFERED)
//            .discreption(UPDATED_DISCREPTION)
//            .dateOfVisit(UPDATED_DATE_OF_VISIT)
//            .lastDate(UPDATED_LAST_DATE)
//            .place(UPDATED_PLACE);
//
//        restOfferMockMvc.perform(put("/api/offers")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(updatedOffer)))
//            .andExpect(status().isOk());
//
//        // Validate the Offer in the database
//        List<Offer> offerList = offerRepository.findAll();
//        assertThat(offerList).hasSize(databaseSizeBeforeUpdate);
//        Offer testOffer = offerList.get(offerList.size() - 1);
//        assertThat(testOffer.getTitle()).isEqualTo(UPDATED_TITLE);
//        assertThat(testOffer.getPackageOffered()).isEqualTo(UPDATED_PACKAGE_OFFERED);
//        assertThat(testOffer.getDiscreption()).isEqualTo(UPDATED_DISCREPTION);
//        assertThat(testOffer.getDateOfVisit()).isEqualTo(UPDATED_DATE_OF_VISIT);
//        assertThat(testOffer.getLastDate()).isEqualTo(UPDATED_LAST_DATE);
//        assertThat(testOffer.getPlace()).isEqualTo(UPDATED_PLACE);
//    }
//
//    @Test
//    public void updateNonExistingOffer() throws Exception {
//        int databaseSizeBeforeUpdate = offerRepository.findAll().size();
//
//        // Create the Offer
//
//        // If the entity doesn't have an ID, it will be created instead of just being updated
//        restOfferMockMvc.perform(put("/api/offers")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(offer)))
//            .andExpect(status().isCreated());
//
//        // Validate the Offer in the database
//        List<Offer> offerList = offerRepository.findAll();
//        assertThat(offerList).hasSize(databaseSizeBeforeUpdate + 1);
//    }
//
//    @Test
//    public void deleteOffer() throws Exception {
//        // Initialize the database
//        offerRepository.save(offer);
//        int databaseSizeBeforeDelete = offerRepository.findAll().size();
//
//        // Get the offer
//        restOfferMockMvc.perform(delete("/api/offers/{id}", offer.getId())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isOk());
//
//        // Validate the database is empty
//        List<Offer> offerList = offerRepository.findAll();
//        assertThat(offerList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//
//    @Test
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(Offer.class);
//        Offer offer1 = new Offer();
//        offer1.setId("id1");
//        Offer offer2 = new Offer();
//        offer2.setId(offer1.getId());
//        assertThat(offer1).isEqualTo(offer2);
//        offer2.setId("id2");
//        assertThat(offer1).isNotEqualTo(offer2);
//        offer1.setId(null);
//        assertThat(offer1).isNotEqualTo(offer2);
//    }
//}
