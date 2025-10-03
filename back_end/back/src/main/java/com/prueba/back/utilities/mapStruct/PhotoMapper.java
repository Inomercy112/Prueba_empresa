package com.prueba.back.utilities.mapStruct;

import org.mapstruct.Named;

import java.util.Base64;
import java.util.regex.Pattern;

public final class PhotoMapper {
    private PhotoMapper() {}


    private static final Pattern BASE64_PATTERN = Pattern.compile("^[A-Za-z0-9+/]*={0,2}$");

    @Named("stringToBytes")
    public static byte[] stringToBytes(String value) {
        if (value == null || value.isBlank()) return null;


        String cleanValue = value.trim();


        if (!isValidBase64(cleanValue)) {

            return null;
        }

        try {
            return Base64.getDecoder().decode(cleanValue);
        } catch (IllegalArgumentException e) {

            return null;
        }
    }

    private static boolean isValidBase64(String value) {

        if (value.length() % 4 != 0) {
            return false;
        }


        return BASE64_PATTERN.matcher(value).matches();
    }

    @Named("bytesToString")
    public static String bytesToString(byte[] value) {
        if (value == null || value.length == 0) return null;
        return Base64.getEncoder().encodeToString(value);
    }


    public static byte[] map(String value) {
        return stringToBytes(value);
    }

    public static String map(byte[] value) {
        return bytesToString(value);
    }
}
