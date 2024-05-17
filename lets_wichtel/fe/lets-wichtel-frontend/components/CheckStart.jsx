export default async function CheckStart(obj, accounts) {
  // Extract blockout DTOs
  let blockoutDtos = obj.blockouts;

  // List of IDs
  let ids = [];
  for (let temp of accounts) {
    ids.push(temp.id_account);
  }

  // Set of pairs of IDs that cannot be matched
  let forbidden = [];
  for (let blockoutDto of blockoutDtos) {
    let pair = [blockoutDto.account_id, blockoutDto.blocked_account_id];
    forbidden.push(pair);
  }

  // Shuffle the IDs to randomize the assignments
  shuffle(ids);

  // Lists for validation
  let idsUsed = [];
  let idsPartnered = [];

  // Assign the IDs to each other
  for (let i = 0; i < ids.length; i++) {
    // Find a valid ID to assign
    let j = (i + 1) % ids.length;
    while (isForbidden(ids[i], ids[j], forbidden)) {
      j = (j + 1) % ids.length;
    }

    // Assign the IDs
    idsUsed.push(ids[i]);
    idsPartnered.push(ids[j]);
  }

  console.log(idsUsed);
  console.log(idsPartnered);

  // Assuming idsUsed and idsPartnered are arrays containing account IDs and partner IDs respectively

  let assignments = [];

  let success = true;

  // Check if the function ran correctly
  if (idsUsed.length !== ids.length || idsPartnered.length !== ids.length) {
    success = false;
  } else {
    // Save the assignments
    for (let i = 0; i < ids.length; i++) {
      let isValidAssignment = true;
      for (let j = 0; j < assignments.length; j++) {
        if (
          assignments[j].partner_id === idsPartnered[i] ||
          assignments[j].account_id === idsUsed[i]
        ) {
          isValidAssignment = false;
          success = false;
          break;
        }
      }
      if (isValidAssignment) {
        assignments.push({
          account_id: idsUsed[i],
          partner_id: idsPartnered[i],
        });
      }
    }
  }

  // Edge case for only two accounts to prevent self-assignment
  if (ids.length === 2 && blockoutDtos.length != 0) {
    success = false;
  }

  return { success };
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

// Method to check if a pair of IDs is forbidden
function isForbidden(id1, id2, forbiddenPairs) {
  for (let pair of forbiddenPairs) {
    if (
      (pair[0] === id1 && pair[1] === id2) ||
      (pair[0] === id2 && pair[1] === id1)
    ) {
      return true;
    }
  }
  return false;
}
