package com.icl.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.icl.domain.Announcement;

import com.icl.repository.AnnouncementRepository;
import com.icl.web.rest.errors.BadRequestAlertException;
import com.icl.web.rest.util.HeaderUtil;
import com.icl.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Announcement.
 */
@RestController
@RequestMapping("/api")
public class AnnouncementResource {

    private final Logger log = LoggerFactory.getLogger(AnnouncementResource.class);

    private static final String ENTITY_NAME = "announcement";

    private final AnnouncementRepository announcementRepository;

    public AnnouncementResource(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    /**
     * POST  /announcements : Create a new announcement.
     *
     * @param announcement the announcement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new announcement, or with status 400 (Bad Request) if the announcement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/announcements")
    @Timed
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) throws URISyntaxException {
        log.debug("REST request to save Announcement : {}", announcement);
        if (announcement.getId() != null) {
            throw new BadRequestAlertException("A new announcement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        System.out.println("time n date :"+announcement.getDate());
        Announcement result = announcementRepository.save(announcement);
        return ResponseEntity.created(new URI("/api/announcements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /announcements : Updates an existing announcement.
     *
     * @param announcement the announcement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated announcement,
     * or with status 400 (Bad Request) if the announcement is not valid,
     * or with status 500 (Internal Server Error) if the announcement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/announcements")
    @Timed
    public ResponseEntity<Announcement> updateAnnouncement(@RequestBody Announcement announcement) throws URISyntaxException {
        log.debug("REST request to update Announcement : {}", announcement);
        if (announcement.getId() == null) {
            return createAnnouncement(announcement);
        }
        Announcement result = announcementRepository.save(announcement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, announcement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /announcements : get all the announcements.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of announcements in body
     */
    @GetMapping("/announcements")
    @Timed
    public ResponseEntity<List<Announcement>> getAllAnnouncements(Pageable pageable) {
        log.debug("REST request to get a page of Announcements");
        Page<Announcement> page = announcementRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/announcements");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /announcements/:id : get the "id" announcement.
     *
     * @param id the id of the announcement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the announcement, or with status 404 (Not Found)
     */
    @GetMapping("/announcements/{id}")
    @Timed
    public ResponseEntity<Announcement> getAnnouncement(@PathVariable String id) {
        log.debug("REST request to get Announcement : {}", id);
        Announcement announcement = announcementRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(announcement));
    }

    /**
     * DELETE  /announcements/:id : delete the "id" announcement.
     *
     * @param id the id of the announcement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/announcements/{id}")
    @Timed
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable String id) {
        log.debug("REST request to delete Announcement : {}", id);
        announcementRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
