package com.dashboard;

import com.dashboard.person.Person;
import com.dashboard.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Component
public class InitData {

    @Autowired
    private PersonRepository personRepository;

    @EventListener
    @Transactional
    public void handleContextRefresh(ContextRefreshedEvent event) {
        /**
         * Only run against local*/
        clearData();
        initData();
    }

    private void clearData() {
        personRepository.deleteAll();
    }

    private void initData() {
        final Person tina = new Person("Tina_Cook", "Tina", "Cook", new Date(), new Date(), "Cory_Ellenberger", null);
        final Person cory = new Person("Cory_Ellenberger", "Cory", "Ellenberger", new Date(), new Date(), "Cory_Ellenberger", tina);
        final Person jed = new Person("Jed_Westover", "Jed", "Westover", new Date(), new Date(), "Cory_Ellenberger", cory);

        personRepository.save(tina);
        personRepository.save(cory);
        personRepository.save(jed);
    }
}
