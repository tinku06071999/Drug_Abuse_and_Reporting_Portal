package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.serviceRepository.UserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService {

    @Autowired
    private UserServiceRepository userServiceRepository;
    //signup User
    public void signup(User user){
        userServiceRepository.save(user);
    }

    public boolean login(User user){
        List<User>list = userServiceRepository.findAll();
        String email = user.getEmail();
        String password = user.getPassword();
        for(User obj: list){
            if(obj.getEmail().equals(email) && obj.getPassword().equals(password)){
                return true;
            }
        }
        return false;
    }

    public User findByUsername(String username){
        return userServiceRepository.findByUsername(username).orElseThrow(null);
    }

}
