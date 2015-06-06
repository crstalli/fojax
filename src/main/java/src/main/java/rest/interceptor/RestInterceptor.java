package src.main.java.rest.interceptor;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class RestInterceptor extends HandlerInterceptorAdapter {

	       
		   private AuthenticationManager authenticationManager;
		   public AuthenticationManager getAuthenticationManager() {
			return authenticationManager;
		}


		public void setAuthenticationManager(AuthenticationManager authenticationManager) {
			this.authenticationManager = authenticationManager;
		}


		private static final Logger logger = Logger.getLogger(AuthenticationManager.class);
		 
		    public boolean preHandle(HttpServletRequest request,
		            HttpServletResponse response, Object handler) throws Exception {
		          
		          String authorization = request.getHeader("Authorization");
		 
		          if (authorization == null) {
		             
		              return false;
		          }
		 
		          String[] credentials = decodeHeader(authorization);
		          assert credentials.length == 2;
		          Authentication authentication = new UsernamePasswordAuthenticationToken(credentials[0], credentials[1]);
		         
		          Authentication successfulAuthentication = authenticationManager.authenticate(authentication);
		          SecurityContextHolder.getContext().setAuthentication(successfulAuthentication);
		        return true;
		    }
		 
		 
		    public String[] decodeHeader(String authorization) {
		    
		        try {
		            byte[] decoded = Base64.decode(authorization.substring(6).getBytes("UTF-8"));
		            String credentials = new String(decoded);
		            return credentials.split(":");
		        } catch (UnsupportedEncodingException e) {
		            throw new UnsupportedOperationException(e);
		        }
		    }
		 
		 
		
}
