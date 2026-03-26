export interface Company {
  id: number;
  name: string;
  avatar?: string;
  ownerAvatar?: string | null;
  industry: number;
  website: string;
  address: string;
  ownerId: number;
  tags?: string[];
  totalDealsValue: number;
  phoneNo: string;
  lastActivityAt: Date;
}
