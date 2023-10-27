import React from "react";


export const data = [
    {
      key:1,
      name: "sample_0.vcf",
      creation_date: "01/01/2023",
      last_update_date: null,
      is_regenerating: false,
      requires_user_validation: true,
    },
    {
      key:2,
      name: "sample_1.vcf",
      creation_date: "01/01/2023",
      last_update_date: "17/06/2023",
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:3,
      name: "irene.vcf",
      creation_date: "01/01/2023",
      last_update_date: null,
      is_regenerating: true,
      requires_user_validation: false,
    },
    {
      key:4,
      name: "manolo.vcf",
      creation_date: "01/01/2023",
      last_update_date: null,
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:5,
      name: "oscar.vcf",
      creation_date: "01/01/2023",
      last_update_date: null,
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:6,
      name: "mireia.vcf",
      creation_date: "01/01/2023",
      last_update_date: "17/06/2023",
      is_regenerating: false,
      requires_user_validation: false,
    },
    {
      key:7,
      name: "alberto.vcf",
      creation_date: "01/01/2023",
      last_update_date: null,
      is_regenerating: true,
      requires_user_validation: false,
    },
    {
      key:8,
      name: "leire.vcf",
      creation_date: "01/01/2023",
      last_update_date: "24/10/2023",
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