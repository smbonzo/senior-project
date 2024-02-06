package com.senior.project.backend.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.convert.Jsr310Converters.DateToLocalDateConverter;
import org.springframework.data.convert.Jsr310Converters.LocalDateToDateConverter;
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions;
import org.springframework.data.r2dbc.dialect.MySqlDialect;

import com.senior.project.backend.converters.BytesToUUID;
import com.senior.project.backend.converters.UUIDToBytes;

/**
 * Configurations for the R2dbc drivers
 * 
 * @author Jimmy Logan - jrl9984@rit.edu
 */
@Configuration
public class R2dbcConfig {

    @Autowired
    private UUIDToBytes uuidByteConverter;
    
    @Autowired
    private BytesToUUID byteUUIDConverter;

    @Bean
    public R2dbcCustomConversions customConversions() {    
        return R2dbcCustomConversions.of(
            MySqlDialect.INSTANCE, 
            uuidByteConverter,
            byteUUIDConverter,
            LocalDateToDateConverter.INSTANCE,
            DateToLocalDateConverter.INSTANCE
        );
    }
}
