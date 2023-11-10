import React from "react";

/* Es importante que la fecha esté en este formato: DD-MM-YYYY o 
    si se quiere otro formato ir a utils.ts -> filterDate y cambiar el formato*/
export const data = [
    {
      key:1,
      name: "sample_0.vcf",
      creation_date: "01-05-2023",
      last_update_date: "14-06-2023",
      is_regenerating: false,
      requires_user_validation: true,
    },
    {
      key:2,
      name: "sample_1.vcf",
      creation_date: "01-05-2023",
      last_update_date: "17-08-2023",
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:3,
      name: "irene.vcf",
      creation_date: "01-01-2023",
      last_update_date: "09-01-2023",
      is_regenerating: true,
      requires_user_validation: false,
    },
    {
      key:4,
      name: "manolo.vcf",
      creation_date: "01-01-2021",
      last_update_date: "19-05-2023",
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:5,
      name: "oscar.vcf",
      creation_date: "01-01-2020",
      last_update_date: "17-06-2020",
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:6,
      name: "mireia.vcf",
      creation_date: "01-01-2023",
      last_update_date: "17-06-2003",
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:7,
      name: "alberto.vcf",
      creation_date: "01-05-2021",
      last_update_date: "24-03-2023",
      is_regenerating: true,
      requires_user_validation: false,
    },
    {
      key:8,
      name: "leire.vcf",
      creation_date: "01-01-2022",
      last_update_date: "24-10-2023",
      is_regenerating: false,
      requires_user_validation: true,
    },
  ];

  export const columns = [
    {
      key: "name",
      label: "FILE NAME",
    },
    {
      key: "creation_date",
      label: "UPLOAD DATE",
    },
    {
      key: "last_update_date",
      label: "LAST REPORT DATE",
    },
    {
      key: "Detailed_report",
      label: "DETAILED REPORT",
    },
    {
      key: "Summary_report",
      label: "SUMMARY REPORT",
    },
    {
      key: "Actions",
      label: "ACTIONS",
    }
  ];

  export const columns_select = [
    { label: "Upload Date", value: "upload_date"},
    { label: "Last Reported", value: "last_reported"},
    { label: "None", value: "none"},
  ];