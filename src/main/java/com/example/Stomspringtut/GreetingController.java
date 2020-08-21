package com.example.Stomspringtut;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public Greeting greeting(HelloMessage message) {
	  String s1="Help";  
	  String s2="I can not log";  
	  String s3="Forgotten Password";  
	  String s4=message.getName(); 
	  String s5=message.getMsg();
	 
	  if (s5.contentEquals(s1)) {		 
		   		return new Greeting(" In order to get help please use these messages: 'I can not log', 'Forgotten Password'");
		}
		else if(s5.contentEquals(s2)) {
			 
			    return new Greeting("If you can not log please send us a message at xxx@xxx.cz");
		}
		else if (s5.contentEquals(s3) ) {
			
			    return new Greeting("To request an reset of your password please visit following link: xxx.com/dda");
		}	
		else {
			return new Greeting("Hello, " + s4 + " how can I help you? You can write me 'Help' to see available options");
	}
   
		
  }
  

}