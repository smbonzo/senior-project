package com.senior.project.backend.converters;

import java.util.UUID;
import java.nio.ByteBuffer;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Converts a byte buffer into a UUID
 * 
 * @author Jimmy Logan - jrl9984@rit.edu
 */
@Component
public class BytesToUUID implements Converter<ByteBuffer, UUID> {
    @Override
    public UUID convert(ByteBuffer source) {
        long high = source.getLong();
        long low = source.getLong();
        return new UUID(high, low);
    }
}
