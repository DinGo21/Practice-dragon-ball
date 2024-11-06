const charactersRequest = "https://dragonball-api.com/api/characters?limit=58";
const planetsRequest = "https://dragonball-api.com/api/planets?limit=20";
const fileName = window.location.pathname.split("/").pop();

async function fetchJson(request)
{
	const response = await fetch(request);

	if (response.ok)
	{
		return await response.json();
	}
	console.error("Error: failed to fetch request: ", request);
	return null;
}

function createCharacterCards({image, name, race, gender, ki, maxKi, affiliation})
{
	return `
		<div class="character">
			<img class="characterImage" src="${image}" alt="${name}"/>
			<div class="characterCard">
				<h4 class="characterName">${name}</h4>
				<p class="characterGenderRace">${race} - ${gender}</p>
				<div class="characterInfo">
					<h5>Base Ki</h5>
					<p>${ki}</p>
				</div>
				<div class="characterInfo">
					<h5>Max Ki</h5>
					<p>${maxKi}</p>
				</div>
				<div class="characterInfo">
					<h5>Affiliation</h5>
					<p>${affiliation}</p>
				</div>
			</div>
		</div>
	`; ``
}

function createPlanetCards({image, name, isDestroyed})
{
	let planetHTML = `
		<div class="planet">
			<img class="planetImage" src="${image}"/>
			<div class="planetCard">
				<h4 class="planetName">${name}</h4>
	`;
	if (isDestroyed === true)
	{
		planetHTML += `
				<p class="planetState">Destroyed</p>
		`
	}
	else
	{
		planetHTML += `
				<p class="planetState">Alive</p>
		`
	}
	planetHTML += `
			</div>
		</div>
	`;
	return planetHTML;
}

async function displayElementCards(elementId, request)
{
	const element = document.getElementById(elementId);
	const elementCount = document.getElementById("count")
	const elementData = await fetchJson(request);
	let	  elementCards;

	if (!element || !elementCount)
	{
		return console.error("Error: couldn't get element by id:", elementId);
	}
	if (!elementData || !elementData.items)
	{
		return console.error("Error: couldn't read data for element:", elementId);
	}
	if (elementId === "characters")
	{
		elementCards = elementData.items.map(createCharacterCards).join('');
	}
	if (elementId === "planets")
	{
		elementCards = elementData.items.map(createPlanetCards).join('');
	}
	element.innerHTML = elementCards;
	elementCount.innerHTML += elementData.meta.totalItems;
}

if (fileName === "index.html")
{
	displayElementCards("characters", charactersRequest);
}
if (fileName === "planets.html")
{
	displayElementCards("planets", planetsRequest);
}
