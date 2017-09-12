import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FeedProvider, FeedItem, Feed } from '../../providers/feed/feed';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';
 
@IonicPage({
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  articles: FeedItem[];
  selectedFeed: Feed;
  loading: Boolean;
 
  constructor(
    private iab: InAppBrowser, 
    private feedProvider: FeedProvider,
    public navParams: NavParams,
    public afAuth:AngularFireAuth,
    public navController: NavController) {
    this.selectedFeed = {
      title: "Ng-Classroom",
      url: "https://www.ion-book.com/feed.xml"
  };
  }
 
  public openArticle(url: string) {
    this.iab.create(url, '_blank');
    // window.open(url, '_blank');
  }
 
  loadArticles() {
    this.loading = true;
    this.feedProvider.getArticlesForUrl(this.selectedFeed.url).subscribe(res => {
      this.articles = res;
      this.loading = false;
    });
  }
  logOut(){
    this.afAuth.auth.signOut();
    this.navController.setRoot(LoginPage);
   }
 
  public ionViewWillEnter() {
    if (this.selectedFeed !== undefined && this.selectedFeed !== null ) {
      this.loadArticles()
    } else {
      this.feedProvider.getSavedFeeds().then(
        feeds => {
          if (feeds.length > 0) {
            let item = feeds[0];
            this.selectedFeed = new Feed(item.title, item.url);
            this.loadArticles();
          }
        }
      );
    }
  }
}