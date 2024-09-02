import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { HeaderComponent } from '../core/components/header/header.component';
import { CommonModule} from '@angular/common';
import { BannerComponent } from '../core/components/banner/banner.component';
import { MovieService } from '../shared/service/movie.service';
import { MovieCarouselComponent } from '../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../shared/model/video-content.interface';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FooterComponent } from '../core/components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,CommonModule,BannerComponent,MovieCarouselComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
auth = inject(AuthService)
movieService = inject(MovieService)
profileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
bannerDetail$ = new Observable<any>();
bannerVideo$ = new Observable<any>();


popularMovies:IVideoContent[] = []
topRatedMovies:IVideoContent[] = []
tvShows:IVideoContent[] = []
nowPlayingMovies:IVideoContent[] = []
upComingMovies:IVideoContent[] = []

sources = {
    popularMovies: this.movieService.getMovies(),
    topRatedMovies: this.movieService.getTopRated(),
    nowPlayingMovies: this.movieService.getNowPlayingMovies(),
    upComingMovies: this.movieService.getUpcomingMovies(),
    tvShows: this.movieService.getTvShows()
}

ngOnInit(): void {
  forkJoin(this.sources)
  .pipe(
    map((responses: any) => ({
      popularMovies: responses.popularMovies.results,
      topRatedMovies: responses.topRatedMovies.results,
      nowPlayingMovies: responses.nowPlayingMovies.results,
      upComingMovies: responses.upComingMovies.results,
      tvShows: responses.tvShows.results,
    }))
  ).subscribe((data) => {
    this.popularMovies = data.popularMovies;
    this.topRatedMovies = data.topRatedMovies;
    this.nowPlayingMovies = data.nowPlayingMovies;
    this.upComingMovies = data.upComingMovies;
    this.tvShows = data.tvShows;
    const movieId = this.popularMovies[1]?.id;
        if (movieId) {
          this.bannerDetail$ = this.movieService.getBannerDetail(movieId);
          this.bannerVideo$ = this.movieService.getBannerVideo(movieId);
        }
  });
}

getMovieKey() {
  this.movieService.getBannerVideo(this.popularMovies[0].id)
  .subscribe(res=>{
    console.log(res);
  })
}
signOut(){
  this.auth.signOut()
  sessionStorage.removeItem("loggedInUser")
}
}
