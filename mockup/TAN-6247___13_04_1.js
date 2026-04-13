module.exports = {
  configuration: {
    name: "Boleta 13-04",
    type: "standard",
    education_year_id: "ey-es-04",
    education_year_level: "Primaria",
    education_year_year: "1.º",
    report_date_period: "2026",
    report_date: "13-04-2026",
    school_group: {
      id: "6ecaf8a0-345b-11f1-995a-a19ef520e8de",
      name: "Grupo 2 - v8",
    },
    students: [
      {
        id: "42cbc4a1-a310-11f0-9117-47c3dd474dea",
        name: "TestAlu",
        lastname: "Alumnotest",
      },
    ],
    only_students_group: true,
    evaluation_periods: [
      { id: "t01", name: "Trimestre 1" },
      { id: "t02", name: "Trimestre 2" },
      { id: "t03", name: "Trimestre 3" },
      { id: "b01", name: "Bimestre 1" },
      { id: "b02", name: "Bimestre 2" },
      { id: "b03", name: "Bimestre 3" },
      { id: "b04", name: "Bimestre 4" },
      { id: "s01", name: "Semestre 1" },
      { id: "s02", name: "Semestre 2" },
      { id: "annual", name: "Anual" },
    ],
    orientation: "vertical",
    max_number_of_rows: "10",
    font_size: "14",
  },
  advanced: {
    evaluation_scale_id: "268dc408-3b09-4aee-9ae2-e04cdd60ad1e",
    show_averages: [{ value: "FINAL_AVERAGES", label: "Promedios finales" }],
    show_category_evaluation: false,
    show_materias: false,
  },
  school: {
    information_school: {
      school_name: "test-happy-path 2",
      school_logo: [
        {
          id: "00000000-0000-0000-0000-000000000000",
          name: "default-school-image.png",
          url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/8b0faa20-7f56-11f0-a564-69bbaa23b626/default-school-image.png",
        },
      ],
    },
    signatures: {
      signature_left: {
        title: "Nombre",
        name: "Izquierdo",
        signature_images: [
          {
            id: "188f7e31-e60b-45c9-b2bf-d01fbeb5c4bf",
            name: "firma002.png",
            url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/188f7e31-e60b-45c9-b2bf-d01fbeb5c4bf/firma002.png",
          },
        ],
      },
      signature_right: {
        title: "Firma",
        name: "Derecho",
        signature_images: [
          {
            id: "831b03e7-b125-40c7-a3ff-3a9fa83481ab",
            name: "firma004.png",
            url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/831b03e7-b125-40c7-a3ff-3a9fa83481ab/firma004.png",
          },
        ],
      },
    },
    information_contact: {
      school_adress: "Dirección",
      school_phone: "0800-0000-55555",
      school_email: "coreo@mail.com",
    },
    certifications: [
      {
        id: "139bc8a2-3a70-48f6-be6c-980eafe8ae9e",
        name: "mejore_anual.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/139bc8a2-3a70-48f6-be6c-980eafe8ae9e/mejore_anual.png",
      },
      {
        id: "a28d0ede-0409-4ecf-bf60-03b8ff36d78b",
        name: "school_destacado.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/a28d0ede-0409-4ecf-bf60-03b8ff36d78b/school_destacado.png",
      },
      {
        id: "50079601-62d9-4aec-ba6d-f33d4443853f",
        name: "certification002.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/50079601-62d9-4aec-ba6d-f33d4443853f/certification002.png",
      },
      {
        id: "0af55455-52bc-42ff-a069-437b376652ba",
        name: "certification001.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/0af55455-52bc-42ff-a069-437b376652ba/certification001.png",
      },
    ],
  },
  students: [
    {
      id: "42cbc4a1-a310-11f0-9117-47c3dd474dea",
      name: "TestAlu",
      lastname: "Alumnotest",
      courses: [
        {
          id: "a8c68d60-3462-11f1-995a-a19ef520e8de",
          name: "Andreu 1 nivel",
          periods: [
            {
              id: "ab7f3cc9-9fbc-4f87-8f7c-0ca4b2fcf554",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "8fe49058-d571-4be3-b7b3-11266e6ff34e",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "ee71b490-3460-11f1-b6e3-6b1b3f7db522",
          name: "Copia Programa power Carmen",
          periods: [
            {
              id: "6c89c8a3-2adf-4e4b-a603-14e3da50d4d6",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "d62b6e89-8caa-43bc-9142-d9329ffbc5d3",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "da37e300-345b-11f1-995a-a19ef520e8de",
          name: "Copia Programa Vanilla Carmen",
          periods: [
            {
              id: "d6de11bd-d187-4a2a-bda1-99c5713db97a",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
          average: {
            id: "fbf8911a-955d-4393-9250-52274cd3f0da",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "15d683f0-3464-11f1-b6e3-6b1b3f7db522",
          name: "Copia Test FRAN",
          periods: [
            {
              id: "e5386d07-060a-42e4-9967-2f6e7119e644",
              average: null,
              averageCalculated: 0,
              period: "b01",
              name: "Bimestre 1",
            },
          ],
          average: {
            id: "7d4a2a49-9f04-4a2a-949a-0bad14920910",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "8eb72220-345f-11f1-995a-a19ef520e8de",
          name: "Copia Test FRANs",
          periods: [
            {
              id: "52ba8035-a329-46d6-ae38-c1962dda36cf",
              average: null,
              averageCalculated: 0,
              period: "b01",
              name: "Bimestre 1",
            },
          ],
          average: {
            id: "8ebfaed8-2e81-44d0-bd60-2fa688cc1d33",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "2198b300-3466-11f1-995a-a19ef520e8de",
          name: "Pokemon",
          periods: [
            {
              id: "79d9acc3-570f-441f-9473-b2c7b8296380",
              average: null,
              averageCalculated: 0,
              period: "annual",
              name: "Anual",
            },
          ],
          average: {
            id: "07a38df6-c21d-4811-869e-36457b04ca6a",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "14d6d1c0-3465-11f1-995a-a19ef520e8de",
          name: "Porgrama prueba1",
          periods: [
            {
              id: "73ff4b81-c79a-4b76-b5b4-8803ae44f95c",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "b5ed37ad-60f6-4ba1-958f-da73c3530ca2",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "ae877ee0-3466-11f1-b6e3-6b1b3f7db522",
          name: "Power lesson 2 niveles",
          periods: [
            {
              id: "e72bd413-8b70-4a81-b0f1-4d73131bbdcd",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "6dbcde2d-c90e-45c6-a1d8-4f3ae334a43b",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "a0abf040-3465-11f1-995a-a19ef520e8de",
          name: "Programa Carmen 1 Nivel",
          periods: [
            {
              id: "18a8393e-8789-465c-8a04-80ffa18b0ce7",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "564d96a6-87c5-450d-b9af-39efb93d4cd1",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "76eb6450-3467-11f1-995a-a19ef520e8de",
          name: "Programa con sesiones 1 nivel",
          periods: [
            {
              id: "18f42dcc-afa5-45e2-8554-c27f00f93ecf",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "ea2ae706-20c4-4c35-bda7-ef4e1d408f91",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "8aa57830-3464-11f1-b6e3-6b1b3f7db522",
          name: "Programa David Prueba",
          periods: [
            {
              id: "8654b78a-7e62-4136-b426-5b166026c36b",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "3ef9acac-39bf-436a-bfd7-d51d9f694c49",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "49a97040-345d-11f1-995a-a19ef520e8de",
          name: "Programa de pruebas Isa.H",
          periods: [
            {
              id: "4ab3de3b-1829-46ab-974e-accebded3d4e",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "356a369a-ed23-407d-ba86-1bb188409298",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "0291d1b0-3468-11f1-995a-a19ef520e8de",
          name: "Programa Fixed Layout",
          periods: [
            {
              id: "162000b8-be01-4459-b1f9-59dc5117f9b5",
              average: null,
              averageCalculated: 0,
              period: "annual",
              name: "Anual",
            },
          ],
          average: {
            id: "eee5a4f2-ea28-48ab-b48d-72c463a2e2e4",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "72bdcef0-3461-11f1-995a-a19ef520e8de",
          name: "programa nuevo 2 jany",
          periods: [
            {
              id: "fa0fe7d6-4f08-4cfb-8eb2-4d08b04acc09",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "f4dc3504-1e98-4892-8d96-d555c3ef2d8e",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "1dc20fe0-3463-11f1-995a-a19ef520e8de",
          name: "Programa power Carmen",
          periods: [
            {
              id: "7c70e90c-a886-4c36-b482-f4409f5d01c9",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
          average: {
            id: "54dfda9c-6962-439e-9ede-590087621aa2",
            average: null,
            averageCalculated: 0,
          },
        },
        {
          id: "14764290-3462-11f1-b6e3-6b1b3f7db522",
          name: "Programa Vanilla Carmen",
          periods: [
            {
              id: "2200def6-437b-4255-86bc-6acec8845db2",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
          average: {
            id: "9593eefe-6075-4b46-a8ca-ab3bbe984bfd",
            average: null,
            averageCalculated: 0,
          },
        },
      ],
      groupAverage: null,
    },
  ],
};
