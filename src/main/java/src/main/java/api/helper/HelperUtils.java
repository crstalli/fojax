package src.main.java.api.helper;

import java.util.List;

public class HelperUtils {

    public static <E> List<E> returnNullIfEmpty(List<E> k) {
        if (k == null || k.size() <= 0) {
            return null;
        }
        return k;
    }
}
