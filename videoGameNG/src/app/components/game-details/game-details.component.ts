import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameRating = 0;
  gameId!: string;
  game!: Game;
  // game: Game = {
  //   id: '',
  //   background_image: '',
  //   name: '',
  //   released: '',
  //   metacritic_url: '',
  //   website: '',
  //   description: '',
  //   metacritic: 0,
  //   genres: [],
  //   parent_platforms: [],
  //   publishers: [],
  //   ratings: [],
  //   screenshots: [],
  //   trailers: []
  // };
  routeSubs!: Subscription;
  gameSubs!: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSubs = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string): void {
    this.gameSubs = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;

        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    if (this.gameSubs) {
      this.gameSubs.unsubscribe();
    }

    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
  }

}
