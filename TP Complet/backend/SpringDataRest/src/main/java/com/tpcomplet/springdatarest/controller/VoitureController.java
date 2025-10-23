package com.tpcomplet.springdatarest.controller;

import com.tpcomplet.springdatarest.model.Voiture;
import com.tpcomplet.springdatarest.repository.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@CrossOrigin(origins = "*")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @RequestMapping("/voitures")
    public Iterable<Voiture> getVoitures(){
        return voitureRepo.findAll();
    }
}
