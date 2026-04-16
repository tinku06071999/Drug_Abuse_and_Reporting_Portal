package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.dto.UserRequest;
import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.entity.User;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import com.DrugAbusePrevention.Reporting.serviceRepository.UserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class UserService {

    @Autowired
    private UserServiceRepository userServiceRepository;
    @Autowired
    private AppUserServiceRepository appUserServiceRepository;
    //signup User
    @Autowired
    private PasswordEncoder passwordEncode;


    @Transactional
    public void saveNewUser(UserRequest userRequest){
        userRequest.setPassword(passwordEncode.encode(userRequest.getPassword()));
        userRequest.setRoles(Arrays.asList("USER"));
        AppUser user = new AppUser(
                userRequest.getUserId(),
                userRequest.getUsername(),
                userRequest.getEmail(),
                userRequest.getPassword(),
                userRequest.getMobile(),
                userRequest.getRoles());
        appUserServiceRepository.save(user);
        User usr = new User(
                userRequest.getUserId(),
                userRequest.getDepartment().toUpperCase()
        );
        userServiceRepository.save(usr);
    }
    @Transactional
    public void saveUser(UserRequest userRequest){

        AppUser user = new AppUser(userRequest.getUserId(),
                userRequest.getUsername(),
                userRequest.getEmail(),
                userRequest.getPassword(),
                userRequest.getMobile(),
                userRequest.getRoles());
        appUserServiceRepository.save(user);
        User usr = new User(
                userRequest.getUserId(),
                userRequest.getDepartment().toUpperCase()
        );
        userServiceRepository.save(usr);
    }
    public boolean login(AppUser user){
        List<AppUser>list = appUserServiceRepository.findAll();
        String email = user.getEmail();
        String password = user.getPassword();
        for(AppUser obj: list){
            if(obj.getEmail().equals(email) && obj.getPassword().equals(password)){
                return true;
            }
        }
        return false;
    }

    public UserRequest findByUsername(String username){
        AppUser user = appUserServiceRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
        User usr = userServiceRepository.findByUserId(user.getUserId()).orElseThrow(() -> new RuntimeException("Employee not found"));

        return new UserRequest(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getMobile(),
                user.getRoles(),
                usr.getDepartment()
        );}

}
