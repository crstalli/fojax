package src.main.java.api.helper;

public class KeyValueString extends KeyValue {
    public String value;

    public KeyValueString(String k, String v) {
        super(k, v);
        value = v;
    }
}
