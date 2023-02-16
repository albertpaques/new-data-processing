export interface QueryCommandItemSetup {
  id: string;
  name: string;
}

export interface EndpointSlot {
  itemName: string;
  slotName: string;
}

export interface EndpointSlotIn {
  isExist: boolean;
  isActive: boolean;
  from?: EndpointSlot[];
}

export interface EndpointSlotOutput {
  isExist: boolean;
  isActive: boolean;
  to?: EndpointSlot[];
}

export interface Endpoint {
  id: string;
  name: string;
  resultName: string;
  in: EndpointSlotIn;
  multiIn: EndpointSlotIn;
  out: EndpointSlotOutput;
  branch: EndpointSlotOutput;
  multiOut: EndpointSlotOutput;
}

export interface QueryCommandItem {
  id: string;
  cmdType: string;
  children?: QueryCommandItem[];
}

export interface WorkspaceState {
  inSlot: EndpointSlot;
  outSlot: EndpointSlot;
  queryCommandTree: QueryCommandItem[];
}

export interface AppState {
  workspace: WorkspaceState;
}
