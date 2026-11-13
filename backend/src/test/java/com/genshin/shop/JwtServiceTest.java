package com.genshin.shop;

import com.genshin.shop.service.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtServiceTest {

    private JwtService serviceWithSecret(String secret) {
        JwtService service = new JwtService();
        ReflectionTestUtils.setField(service, "secret", secret);
        ReflectionTestUtils.setField(service, "expiration", 60000L);
        return service;
    }

    @Test
    void tokenContainsUsername() {
        JwtService service = serviceWithSecret("test_secret_key_with_at_least_32_characters_long");
        String token = service.generateToken("yosser");
        assertEquals("yosser", service.extractUsername(token));
    }

    @Test
    void validTokenIsAccepted() {
        JwtService service = serviceWithSecret("test_secret_key_with_at_least_32_characters_long");
        assertTrue(service.isTokenValid(service.generateToken("yosser")));
    }

    @Test
    void tokenSignedWithAnotherSecretIsRejected() {
        JwtService good = serviceWithSecret("test_secret_key_with_at_least_32_characters_long");
        JwtService other = serviceWithSecret("another_secret_key_with_at_least_32_chars_xx");
        assertFalse(good.isTokenValid(other.generateToken("yosser")));
    }
}