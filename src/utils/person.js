export function formatName(info) {
  return `${info.firstName} ${info.lastName}`;
}

export function formatNameCN(info) {
  return info.lastNameCN + info.firstNameCN;
}

export function formatNameCNAlt(info) {
  return info.lastNameCNAlt + info.firstNameCN;
}
