import { useMutation ,useQuery} from "@tanstack/react-query";
import {login,register,profile,logout,fetchRoleService} from "../api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
export const useGetProfile = () => {
  return useQuery({
    queryKey:['profile'],
    queryFn:profile
  })
};
export const useGetRoleService = () => {
  return useQuery({
    queryKey:['user-roles'],
    queryFn:fetchRoleService
  })
};
