package com.genshin.shop;

import com.genshin.shop.controller.HealthController;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HealthControllerTest {

    @Test
    void healthReturnsOk() {
        assertEquals("ko", new HealthController().health().get("status"));
    }
}