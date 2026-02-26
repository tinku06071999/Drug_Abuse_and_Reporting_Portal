package com.DrugAbusePrevention.Reporting.controller;


import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    //signup user
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signUp(@RequestBody User user){
        try{
            userService.signup(user);
            return new ResponseEntity<>(true,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    //login user
    @PostMapping("/login")
    public ResponseEntity<Boolean>login(@RequestBody User user){

         if(userService.login(user)){
             return new ResponseEntity<>(true,HttpStatus.OK);
         }else{
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
    }

    // ✅ Debug endpoint (VERY helpful)
    @GetMapping("/ping")
    public String ping() {
        return "users controller working";
    }

}
