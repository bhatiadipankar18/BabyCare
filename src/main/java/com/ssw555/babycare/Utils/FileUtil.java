package com.ssw555.babycare.Utils;

import java.nio.file.Path;
import java.nio.file.Paths;

public final class FileUtil {

    private FileUtil() {
        // restrict instantiation
    }

    public static final String folderPath =  "music//";
    public static final Path filePath = Paths.get(folderPath);

}
