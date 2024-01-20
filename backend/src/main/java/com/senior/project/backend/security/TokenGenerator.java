package com.senior.project.backend.security;

import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import java.io.PrintWriter;
import java.io.StringWriter;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.NumericDate;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.keys.HmacKey;
import org.jose4j.lang.JoseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.senior.project.backend.security.domain.AuthInformation;
import com.senior.project.backend.security.domain.TempUser;
import com.senior.project.backend.security.verifiers.TokenVerificiationException;

import jakarta.annotation.PostConstruct;

@Component
public class TokenGenerator {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    private Key key;
    private JwtConsumer jwtConsumer;

    @Autowired
    private AuthInformation authInformation;

    public String generateToken(TempUser user) {
        JsonWebSignature jws = new JsonWebSignature();

        JwtClaims claims = new JwtClaims();
        claims.setSubject(user.getEmail());
        claims.setExpirationTimeMinutesInTheFuture(authInformation.getTokenDuration() / 60);
        claims.setIssuedAtToNow();

        jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.HMAC_SHA256);  
        jws.setKey(key);
        jws.setPayload(claims.toJson());  

        try {
            return jws.getCompactSerialization();
        } catch (JoseException e) {
            e.printStackTrace();
            return "";
        }
    }

    public String extractEmail(String token) throws TokenVerificiationException {
        try {
            return jwtConsumer.processToClaims(token).getSubject();
        } catch (InvalidJwtException e) {
            throw new TokenVerificiationException("Token was expired.");
        } catch (Exception e) {
            throw new TokenVerificiationException("Token was malformed.");
        }
    }

    public NumericDate extractExpDate(String token) throws TokenVerificiationException {
        try {
            return jwtConsumer.processToClaims(token).getExpirationTime();
        } catch (InvalidJwtException e) {
            StringWriter writer = new StringWriter();
            PrintWriter printWriter = new PrintWriter(writer);
            e.printStackTrace(printWriter);
            logger.error(writer.toString());
            throw new TokenVerificiationException("Token was expired.");
        } catch (Exception e) {
            throw new TokenVerificiationException("Token was malformed.");
        }
    }

    //
    // Private
    //

    @PostConstruct
    private void initTokenGenerator() throws NoSuchAlgorithmException, UnsupportedEncodingException {
        // Load the key
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] bytes = authInformation.getSigningKey().getBytes("UTF-8");
        md.update(bytes);
        byte[] keyBytes = md.digest();

        this.key =  new HmacKey(keyBytes);
        this.jwtConsumer = jwtConsumerFactory();
    }

    private JwtConsumer jwtConsumerFactory() {
        return new JwtConsumerBuilder()
            .setRequireExpirationTime()
            .setRequireIssuedAt()
            .setVerificationKey(this.key)
            .build();
    }
}
