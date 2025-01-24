export interface Audio extends Entity {
  encodedFilePath: string;
  cloudUrl: string;
  duration: number;
  category: string;
  type: string;
  title: string;
  description: string;
  tags: string;
}

export interface Device extends Entity {
  serialNumber: string;
  deviceGroupName: string;
  organizationName: string;
  assetTag: string;
  deviceVersion: number;
  appVersion: number;
  locationId: string;
  activatedOn?: Date;
  lastStatus?: DeviceStatusDto;
  isOnline?: boolean;
  licenses?: Array<LicenseDto>;
}

export interface License extends Entity {
  deviceId: string;
  type: string;
  expireOn: Date;
}


export interface DeviceStatus extends Entity {
  deviceId: string;
  status: string;
}

export interface Group extends Entity {
  name: string;
  numOfDevices?: number;
  numOfPlaylists?: number;
}

export interface Playlist extends Entity {
  name: string;
  startDate: Date;
  endDate: Date;
  // daily start and end time in minutes, offset from midnight
  startTime: number;
  endTime: number;
  deviceGroups: GroupDto[];
  subPlaylists: SubPlaylistDto[];
}


export interface SubPlaylist extends Entity {
  playlistId: string;
  positionX: number; // top left corner in a screen
  positionY: number; // top left corner in a screen
  width: number; // 0 to 100 percentage
  height: number; // 0 to 100 percentage
  playlistItems: PlaylistItemDto[];
}

export interface PlaylistItem extends Entity {
  index: number;
  subPlaylistId: string;
  mediaAssetId: string; // media asset id
  assetDiscriminator: string; // Video, Audio or Image
  duration: number; // for how long the asset will be displayed since the media start time
  media: any;

  cacheLocation: string;
}

export interface Customer extends Entity {
  name: string;
}

export interface Location extends Entity {
  address: string;
  locale: string;
  timezoneOffset: number;
}

export interface PlaylistGroup extends Entity {
  playlistId: string;
  groupId: string;
}

export interface Image extends Entity {
  encodedFilePath: string;
  cloudUrl: string;
  category: string;
  type: string;
  title: string;
  description: string;
  tags: string;
}

export interface Video extends Entity {
  cloudUrl: string;
  encodedFilePath: string;
  progressiveUrl: string;
  hlsUrl: string;
  duration: number;
  sourceId: string;
  sourceType: string;
  category: string;
  type: string;
  title: string;
  description: string;
  tags: string;
  mainThumbnail: string;
  thumbnails: string[];
  checked?: boolean;
  assetType?: string;
}

export interface UserDto{
  userName: string;
  email: string;
  phoneNumber: string;
  token?: string;
}

export class Entity{
  id?: string;
  createdOn?: Date;
  updatedOn?: Date;
  createdBy?: string;
  updatedBy?: string;
}
