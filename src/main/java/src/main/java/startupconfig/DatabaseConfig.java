package src.main.java.startupconfig;

import org.apache.log4j.Logger;

public class DatabaseConfig {

	private final Logger logger = Logger.getLogger(DatabaseConfig.class);
	
	private String userName;
	
	private String password;
	
	private String host;
	
	private String port;
	

	
	public DatabaseConfig (String userName, String password, String host, String port){
		

		
		String systemName=System.getenv("OPENSHIFT_MONGODB_DB_USERNAME");
		if(systemName!=null && !systemName.isEmpty()){
			setUserName(systemName);
		} else {
			setUserName(userName);
		}
	
			

		String systemPassword=System.getenv("OPENSHIFT_MONGODB_DB_PASSWORD");
		if(systemPassword!=null && !systemPassword.isEmpty()){
			setPassword(systemPassword);
		} else {
			setPassword(password);
		}


		String systemHost=System.getenv("OPENSHIFT_MONGODB_DB_HOST");
		if(systemHost!=null && !systemHost.isEmpty()){
			setHost(systemHost);
		} else {
			setHost(host);
		}

		String systemPort=System.getenv("OPENSHIFT_MONGODB_DB_PORT");
		if(systemPort!=null && !systemPort.isEmpty()){
			setPort(systemPort);
		} else {
			setPort(port);
		}
		
		logger.info("Database Connection Properties");
		logger.info("OPENSHIFT_MONGODB_DB_USERNAME = " + getUserName());
		logger.info("OPENSHIFT_MONGODB_DB_PASSWORD = " + getPassword());
		logger.info("OPENSHIFT_MONGODB_DB_HOST = " + getHost());
		logger.info("OPENSHIFT_MONGODB_DB_PORT = " + getPort());
	}
	
	/*
	 * 
	 * 
	 * 
	 * 	public DatabaseConfig (){
		setUserName(System.getenv("OPENSHIFT_MONGODB_DB_USERNAME"));
		setPassword(System.getenv("OPENSHIFT_MONGODB_DB_PASSWORD"));
		setHost(System.getenv("OPENSHIFT_MONGODB_DB_HOST"));
		setPort(System.getenv("OPENSHIFT_MONGODB_DB_PORT"));
	}
	 *	public DatabaseConfig (String name, String pass, String hos, String por){
		
		String systemName=System.getenv("OPENSHIFT_MONGODB_DB_USERNAME");
		if(systemName==null || systemName.isEmpty()){
			setUserName(name);
		} else {
			setUserName(systemName);
		}

		String systemPassword=System.getenv("OPENSHIFT_MONGODB_DB_PASSWORD");
		if(systemPassword==null || systemPassword.isEmpty()){
			setPassword(pass);
		} else {
			setPassword(systemPassword);
		}


		String systemHost=System.getenv("OPENSHIFT_MONGODB_DB_HOST");
		if(systemHost==null || systemHost.isEmpty()){
			setHost(hos);
		} else {
			setHost(systemHost);
		}

		String systemPort=System.getenv("OPENSHIFT_MONGODB_DB_PORT");
		if(systemPort==null || systemPort.isEmpty()){
			setPort(por);
		} else {
			setPort(systemPort);
		}
	}
	 */

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}
}
