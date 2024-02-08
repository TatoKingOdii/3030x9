import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {v4} from "uuid";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../../model/endpoints";
import {Item} from "../../model/item";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private selectedContent?: Item;
  private contentList: Item[] = [];

  constructor(private httpClient: HttpClient) {
    console.log('Loading content: ' + ENDPOINT_BASE + EndpointPaths.get(Endpoint.INVENTORY));

    // Later revision add error handling with observables from rxjs
    this.httpClient.get<Item[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.INVENTORY))
      .subscribe(resp => {
        this.contentList = resp;
        console.log('Response: ' + JSON.stringify(resp));
      });
  }

  addContent(addedContent: Item) {
    addedContent.id = v4();
    // Would be a post call here to create it on the backend
    this.contentList.push({...addedContent});
  }

  updateContent(contentEvent: Item) {
    console.log("Create / Update received for: " + JSON.stringify(contentEvent));
    let idx: number = this.findIdxForContent(contentEvent);

    // Weird quirk with the form the state of the expiration is still set
    // if it was previously, so clear it out here before saving
    if (!contentEvent.hasExpiration) {
      contentEvent.expirationDate = null;
    }

    if (idx !== -1) {
      // Would be a put call here to update the existing content on the backend
      this.contentList[idx].name = contentEvent.name;
      this.contentList[idx].quantity = contentEvent.quantity;
      this.contentList[idx].category = contentEvent.category;
      this.contentList[idx].receiveDate = contentEvent.receiveDate;
      this.contentList[idx].hasExpiration = contentEvent.hasExpiration;
      this.contentList[idx].expirationDate = contentEvent.expirationDate;
    } else {
      this.addContent(contentEvent)
    }
    this.resetSelectedContent();
  }

  deleteContent(deletedContent: Item) {
    let idx: number = this.findIdxForContent(deletedContent);

    if (idx !== -1) {
      // Would be a delete call here to delete it from the backend
      this.contentList.splice(idx, 1);
    }

    if (this.selectedContent && deletedContent.id === this.selectedContent.id) {
      this.selectedContent = undefined;
    }
  }

  getAllContent() : Item[] {
    return this.contentList;
  }

  selectContent(contentEvent: Item) {
    this.selectedContent = contentEvent;
  }
  getSelectedContent() : Item | undefined {
    return this.selectedContent;
  }
  resetSelectedContent() {
    console.log('RESET');
    this.selectedContent = this.getDefaultContent();
  }

  private findIdxForContent(searchContent: Item) : number {
    return this.contentList.findIndex(content => content.id === searchContent.id);
  }

  getDefaultContent() : Item {
    return {
      id: '',
      name: '',
      quantity: 0,
      category: null,
      receiveDate: null,
      hasExpiration: false,
      expirationDate: null
    }
  }
}
