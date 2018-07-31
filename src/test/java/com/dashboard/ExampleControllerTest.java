package com.dashboard;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class ExampleControllerTest {

    @InjectMocks
    private ExampleController exampleController;

    @Test
    public void testExample() throws Exception {
        ResponseEntity response = exampleController.getDemo();
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
