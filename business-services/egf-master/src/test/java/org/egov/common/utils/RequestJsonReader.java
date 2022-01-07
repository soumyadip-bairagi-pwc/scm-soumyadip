package org.egov.common.utils;

import java.io.IOException;

import org.apache.commons.io.IOUtils;

public class RequestJsonReader {

    private static final String CODE="UTF-8";
    public String readRequest(String fileName) {
        try {
        	String info=IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream("common/request_info.json"), CODE);

            String data= IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream(fileName), CODE);
            return "{\n"+info+","+data+"}";

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String readResponse(String fileName) {
        try {
        	String info=IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream("common/response_info.json"), CODE);

            String data= IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream(fileName), CODE);
            return "{\n"+info+","+data+"}";

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String readErrorResponse(String fileName) {
        try {
        	String info=IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream("common/error_info.json"), CODE);

            String data= IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream(fileName), CODE);
            return "{\n"+info+","+data+"}";

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public String getRequestInfo() {
		try {
			String info = IOUtils.toString(
					this.getClass().getClassLoader().getResourceAsStream("common/request_info.json"), CODE);

			return "{\n" + info + "}";

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
    
}