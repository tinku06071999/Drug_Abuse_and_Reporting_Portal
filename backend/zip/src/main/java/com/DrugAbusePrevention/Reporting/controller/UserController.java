package com.DrugAbusePrevention.Reporting.controller;


import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    //login user
    @PostMapping("/login")
    public ResponseEntity<Boolean>login(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
         User user = userService.findByUsername(username);
         if(user != null) {
             if (userService.login(user)) {
                 return new ResponseEntity<>(true, HttpStatus.OK);
             }
         }
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // ✅ Debug endpoint (VERY helpful)
    @GetMapping("/ping")
    public String ping() {
        return "users controller working";
    }

}
