export const data = {
  lineageDirection: "BOTH",
  lineageDepth: 1,
  guidEntityMap: {
    "new1241b166-f3f4-47a6-ace8-a28b8cc74ed6": {
      typeName: "gt_generation",
      createdBy: "dummy-data",
      description: "None",
      attributes: {
        inputs: [
          {
            guid: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
            typeName: "drive_session_raw",
          },
        ],
        outputs: [
          {
            guid: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
            typeName: "drive_session_gt",
          },
        ],
        qualifiedName:
          "gt_generation/5275fc6f-68fb-4690-a4f8-f7831e2ff324/a-week-last-tuesday",
        name:
          "gt_generation/5275fc6f-68fb-4690-a4f8-f7831e2ff324/a-week-last-tuesday",
      },
      guid: "new1241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      createTime: 1586540719638,
      updatedBy: "dummy-data",
      updateTime: 1586540719638,
      relationshipAttributes: {
        outputs: [
          {
            guid: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
            typeName: "drive_session_gt",
          },
        ],
        inputs: [
          {
            guid: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
            typeName: "drive_session_raw",
          },
        ],
      },
    },
    "new2241b166-f3f4-47a6-ace8-a28b8cc74ed6": {
      typeName: "gt_generation",
      createdBy: "dummy-data",
      description: "None",
      attributes: {
        inputs: [
          {
            guid: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
            typeName: "drive_session_raw",
          },
        ],
        outputs: [
          {
            guid: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
            typeName: "drive_session_gt",
          },
        ],
        qualifiedName:
          "gt_generation/5275fc6f-68fb-4690-a4f8-f7831e2ff324/a-week-last-tuesday",
        name:
          "gt_generation/5275fc6f-68fb-4690-a4f8-f7831e2ff324/a-week-last-tuesday",
      },
      guid: "new2241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      createTime: 1586540719638,
      updatedBy: "dummy-data",
      updateTime: 1586540719638,
      relationshipAttributes: {
        outputs: [
          {
            guid: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
            typeName: "drive_session_gt",
          },
        ],
        inputs: [
          {
            guid: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
            typeName: "drive_session_raw",
          },
        ],
      },
    },

    "3241b166-f3f4-47a6-ace8-a28b8cc74ed6": {
      typeName: "gt_generation",
      createdBy: "dummy-data",
      description: "None",
      attributes: {
        inputs: [
          {
            guid: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
            typeName: "drive_session_raw",
          },
        ],
        outputs: [
          {
            guid: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
            typeName: "drive_session_gt",
          },
        ],
        qualifiedName:
          "gt_generation/5275fc6f-68fb-4690-a4f8-f7831e2ff324/a-week-last-tuesday",
        name:
          "gt_generation/5275fc6f-68fb-4690-a4f8-f7831e2ff324/a-week-last-tuesday",
      },
      guid: "3241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      createTime: 1586540719638,
      updatedBy: "dummy-data",
      updateTime: 1586540719638,
      relationshipAttributes: {
        outputs: [
          {
            guid: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
            typeName: "drive_session_gt",
          },
        ],
        inputs: [
          {
            guid: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
            typeName: "drive_session_raw",
          },
        ],
      },
    },
    "ee09b37b-bec7-48bc-9621-986e8cc60df8": {
      typeName: "drive_session_gt",
      createdBy: "dummy-data",
      description: "None",
      attributes: {
        path: "/mapr/ground-truth/5275fc6f-68fb-4690-a4f8-f7831e2ff324",
        qualifiedName: "drive_session_gt/5275fc6f-68fb-4690-a4f8-f7831e2ff324",
        name: "drive_session_gt/5275fc6f-68fb-4690-a4f8-f7831e2ff324",
        fleetId: "12345",
      },
      guid: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
      createTime: 1586540719556,
      updatedBy: "dummy-data",
      updateTime: 1586540719556,
      relationshipAttributes: {
        outputFromProcesses: [
          {
            guid: "3241b166-f3f4-47a6-ace8-a28b8cc74ed6",
            typeName: "gt_generation",
          },
        ],
      },
    },
    "e5cc587c-f1a2-4d13-b70d-9be41004e231": {
      typeName: "drive_session_raw",
      createdBy: "dummy-data",
      description: "None",
      attributes: {
        references: [
          {
            guid: "395927ad-375c-417a-a06e-5e182bbb0eb9",
            typeName: "car_configuration",
          },
        ],
        path: "/mapr/drive-sessions/5275fc6f-68fb-4690-a4f8-f7831e2ff324",
        qualifiedName: "drive_session_raw/5275fc6f-68fb-4690-a4f8-f7831e2ff324",
        name: "drive_session_raw/5275fc6f-68fb-4690-a4f8-f7831e2ff324",
      },
      guid: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
      createTime: 1586540719469,
      updatedBy: "dummy-data",
      updateTime: 1586540719469,
      relationshipAttributes: {
        inputToProcesses: [
          {
            guid: "3241b166-f3f4-47a6-ace8-a28b8cc74ed6",
            typeName: "gt_generation",
          },
        ],
        references: [
          {
            guid: "395927ad-375c-417a-a06e-5e182bbb0eb9",
            typeName: "car_configuration",
          },
        ],
      },
    },
  },
  relations: [
    {
      fromEntityId: "3241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      toEntityId: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
      relationType: "outputs",
    },
    {
      fromEntityId: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
      toEntityId: "3241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      relationType: "inputToProcesses",
    },
    {
      fromEntityId: "new2241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      toEntityId: "e5cc587c-f1a2-4d13-b70d-9be41004e231",
      relationType: "references",
    },
    {
      fromEntityId: "ee09b37b-bec7-48bc-9621-986e8cc60df8",
      toEntityId: "new1241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      relationType: "inputToProcesses",
    },
    {
      fromEntityId: "new2241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      toEntityId: "new1241b166-f3f4-47a6-ace8-a28b8cc74ed6",
      relationType: "some-relationship",
    },
  ],
  baseEntityGuid: "3241b166-f3f4-47a6-ace8-a28b8cc74ed6",
};
