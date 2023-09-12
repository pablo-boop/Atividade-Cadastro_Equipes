class Team {
    constructor(name, holders) {
        this.id = this.generateID();
        this.name = name;
        this.holders = holders;
        this.banch = this.calculateBanch();
        this.total = this.countPlayers();
    }

    generateID() {
        return Math.floor(Math.random() * 1000)
    }

    calculateBanch() {
        return Math.floor(this.holders / 2);
    }

    countPlayers() {
        return (this.holders + this.banch);
    }
}

class TeamList {
    constructor() {
        this.teams = [];
    }
    //CRUD = create, read, update, delete

    //C = create
    add(param) {
        this.teams.push(param)
        cleanInputs()
    }

    //R = read
    listTeams() {
        return this.teams;
    }

    //Find ID 
    listTeamsById(param) {
        return this.teams.find((team) => team.id == param)
    }

    //U = update
    updateTeam(id, name, quantity) {
        const team = this.listTeamsById(id);
        
        team.name = name;
        team.holders = quantity;
        team.banch = this.calculateBanch();
        team.total = this.countPlayers();

        return team;
    }

    //D = delete
    deleteTeam(param) {
        return this.teams.filter((team) => team.id != param);
    }
}

const teamList = new TeamList();

function createTeam() {
    const name = document.getElementById("team").value;
    const quantity = Number(document.getElementById("quantity").value);

    const newTeam = new Team(name, quantity)
    teamList.add(newTeam)
    listTeams()
}

function listTeams() {
    const teams = teamList.listTeams();
    
    const elementList = document.getElementById("list-teams");
    elementList.innerHTML = "";

    let content = "";

    teams.forEach((team) => {
        content += 
        `
            <div class="cards" onclick="listTeamsById(${team.id})">
                <p>Nome da equipe: ${team.name}</p>
            </div>
        `
    });

    elementList.innerHTML = content;
}

function listTeamsById(id) {
    const uniqueTeam = teamList.listTeamsById(id)

    const elementList = document.getElementById("listUniqueTeam");
    elementList.innerHTML = "";

    let content = 
        `
        <div class="cards-unique">
        <h3>Nome da equipe: ${uniqueTeam.name}</h3>
        <p>ID: ${uniqueTeam.id}</p>
        <p>Titulares: ${uniqueTeam.holders}</p>
        <p>Reservas: ${uniqueTeam.banch}</p>
        <p>Total de jogadores: ${uniqueTeam.total}</p>
            <div id="actions-div">
                <button class="actions" onclick="updateTeam(${uniqueTeam.id})">
                    <i class="fa-solid fa-pencil"></i>
                </button>
                <button class="actions" onclick="deleteTeamFunc(${uniqueTeam.id})">
                    Deletar
                </button>
            </div>
        </div>
        `

    elementList.innerHTML = content;
}

let aux = null;

function updateTeam(id) {
    const team = teamList.listTeamsById(id)

    document.getElementById("team").value = team.name;
    document.getElementById("quantity").value = team.holders;

    document.getElementById("button-register").classList.add("hidden");
    document.getElementById("button-edit").classList.remove("hidden");

    aux = id;
}

function editTeam() {
    const name = document.getElementById("team").value;
    const quantity = Number(document.getElementById("quantity").value);

    teamList.updateTeam(aux, name, quantity);

    listTeams()

    document.getElementById("button-register").classList.remove("hidden");
    document.getElementById("button-edit").classList.add("hidden");

    aux = null;
}

function deleteTeamFunc(id) {
    teamList.deleteTeam(id)

    listTeams()

    document.getElementById("listUniqueTeam").classList.add("hidden")

    if(teamList.teams.length == 0) {
        document.getElementById("listUniqueTeam").classList.add("hidden")
    }
}

function cleanInputs() {
    document.getElementById("team").value = ""
    document.getElementById("quantity").value = ""
}