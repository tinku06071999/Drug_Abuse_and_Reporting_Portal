package com.DrugAbusePrevention.Reporting.service;

import com.DrugAbusePrevention.Reporting.entity.AppUser;
import com.DrugAbusePrevention.Reporting.serviceRepository.AppUserServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AppUserServiceRepository appUserServiceRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        AppUser user = appUserServiceRepository.findByEmail(email).orElseThrow(() ->
                        new UsernameNotFoundException("No user found with email: " + email));

            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .roles(user.getRoles().toArray(new String[0]))
                    .build();

    }
}