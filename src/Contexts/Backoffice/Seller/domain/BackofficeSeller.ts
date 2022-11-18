import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { BackofficeSellerBirthday } from "./BackofficeSellerBirthday";
import { BackofficeSellerDisplayName } from "./BackofficeSellerDisplayName";
import { BackofficeSellerEmail } from "./BackofficeSellerEmail";
import { BackofficeSellerPhone } from "./BackofficeSellerPhone";
import { BackofficeSellerUid } from "./BackofficeSellerUid";

export class BackofficeSeller extends AggregateRoot {
  readonly id: BackofficeSellerUid;
  readonly displayname: BackofficeSellerDisplayName;
  readonly phone: BackofficeSellerPhone;
  readonly email: BackofficeSellerEmail;

  constructor(
    id: BackofficeSellerUid,
    displayname: BackofficeSellerDisplayName,
    phone: BackofficeSellerPhone,
    email: BackofficeSellerEmail,
  ) {
    super();
    this.id = id;
    this.displayname = displayname;
    this.phone = phone;
    this.email = email;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      displayname: this.displayname.value,
      phone: this.phone.value,
      email: this.email.value,
    };
  }

  static fromPrimitives(plainData: {
    uid: string;
    displayname: string;
    phone: string;
    email: string;
  }) {
    return new BackofficeSeller(
      new BackofficeSellerUid(plainData.uid),
      new BackofficeSellerDisplayName(plainData.displayname),
      new BackofficeSellerPhone(plainData.phone),
      new BackofficeSellerEmail(plainData.email),
    );
  }
}
