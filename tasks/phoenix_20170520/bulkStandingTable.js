var fetch = require("node-fetch");
const api = "http://localhost:3000/api/v1.0";
// const api = "http://ss-core.herokuapp.com/api/v1.0";

const structure = [
    //ccc b
    {
        category_id: 33,
        initial_phase_id: 39,
        phases: [
            {
                groups: 4,
                teams_per_group: 4,
                classifying_teams_per_phase: 0
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 0
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //ccc g
    {
        category_id: 35,
        initial_phase_id: 41,
        phases: [
            {
                groups: 2,
                teams_per_group: 3,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 0
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //nca u-6
    {
        category_id: 97,
        initial_phase_id: 104,
        phases: [
            {
                groups: 2,
                teams_per_group: 4,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 2
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //nca u-8
    {
        category_id: 83,
        initial_phase_id: 89,
        phases: [
            { groups: 3, teams_per_group: 4, classifying_teams_per_phase: 4 },
            { groups: 2, teams_per_group: 2, classifying_teams_per_phase: 2 },
            { groups: 1, teams_per_group: 2, classifying_teams_per_phase: 1 }
        ]
    },
    //nca u-10
    {
        category_id: 84,
        initial_phase_id: 88,
        phases: [
            { groups: 5, teams_per_group: 4, classifying_teams_per_phase: 8 },
            { groups: 4, teams_per_group: 2, classifying_teams_per_phase: 4 },
            { groups: 2, teams_per_group: 2, classifying_teams_per_phase: 2 },
            { groups: 1, teams_per_group: 2, classifying_teams_per_phase: 1 }
        ]
    },
    //nca u-12
    {
        category_id: 85,
        initial_phase_id: 91,
        phases: [
            {
                groups: 5,
                teams_per_group: 4,
                classifying_teams_per_phase: 8
            },
            {
                groups: 4,
                teams_per_group: 2,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 2
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //nca u-16
    {
        category_id: 86,
        initial_phase_id: 92,
        phases: [
            {
                groups: 6,
                teams_per_group: 4,
                classifying_teams_per_phase: 8
            },
            {
                groups: 4,
                teams_per_group: 2,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 2
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //nca u-18
    {
        category_id: 88,
        initial_phase_id: 93,
        phases: [
            {
                groups: 3,
                teams_per_group: 4,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 2
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //af
    {
        category_id: 82,
        initial_phase_id: 90,
        phases: [
            {
                groups: 3,
                teams_per_group: 4,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 2
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //jca
    {
        category_id: 8,
        initial_phase_id: 39,
        phases: [
            {
                groups: 4,
                teams_per_group: 4,
                classifying_teams_per_phase: 8
            },
            {
                groups: 4,
                teams_per_group: 2,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 2
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    },
    //td3v3
    {
        category_id: 46,
        initial_phase_id: 52,
        phases: [
            {
                groups: 8,
                teams_per_group: 4,
                classifying_teams_per_phase: 8
            },
            {
                groups: 4,
                teams_per_group: 2,
                classifying_teams_per_phase: 4
            },
            {
                groups: 2,
                teams_per_group: 2,
                classifying_teams_per_phase: 2
            },
            {
                groups: 1,
                teams_per_group: 2,
                classifying_teams_per_phase: 1
            }
        ]
    }
];

const getRQ = (data, method) => {
    return {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    };
};

const getPhases = () => {
    const promises = structure.map(cat => {
        return fetch(`${api}/category/${cat.category_id}/match`)
            .then(res => res.json())
            .then(res => res.data);
    });
    const filterPhasesId = input => {
        const output = [];
        input.map(category => {
            return category.phases.map(phase => {
                console.log(phase);
                output.push(phase.id);
            });
        });
        return output;
    };
    return Promise.all(promises).then(res => filterPhasesId(res));
};

getPhases()
    .then(phases => {
        phases.map(phaseId => {
            const body = "";
            fetch(
                `${api}/phase/${phaseId}/standing_table`,
                getRQ(body, "POST")
            );
            // .then(res => res.json())
            // .then(res => {
            //     console.log(res.data);
            // })
            // .catch(e => {
            //     "error", console.log(e);
            // });
        });
    })
    .catch(e => {
        console.log(e);
    });
