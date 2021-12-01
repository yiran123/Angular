import { AccountsService } from "./../accounts.service";
import { LoggingService } from "./../logging.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
  // providers: [LoggingService],
})
export class NewAccountComponent {
  constructor(
    private loggingService: LoggingService,
    private accoutsService: AccountsService
  ) {
    this.accoutsService.statusUpdated.subscribe((status: string) =>
      alert("New Status: " + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accoutsService.addAcount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
