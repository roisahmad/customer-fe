import apiClient from "./apiClient";
import { ANALYTIC_URL } from "./apiUrl";

export const getGenderAnaylytic = () => {
  return apiClient.get(`${ANALYTIC_URL}/gender-distribution`);
};

export const getAgeAnaylytic = () => {
  return apiClient.get(`${ANALYTIC_URL}/age-distribution`);
};

export const getBrandAnaylytic = () => {
  return apiClient.get(`${ANALYTIC_URL}/brand-device`);
};

export const getDigitalInterestAnaylytic = () => {
  return apiClient.get(`${ANALYTIC_URL}/digital-interest`);
};

export const getLoginHourAnaylytic = () => {
  return apiClient.get(`${ANALYTIC_URL}/login-hour`);
};

export const getLocationAnaylytic = () => {
  return apiClient.get(`${ANALYTIC_URL}/location-distribution`);
};

export const getVisitDateAnaylytic = () => {
  return apiClient.get(`${ANALYTIC_URL}/visit-date`);
};
