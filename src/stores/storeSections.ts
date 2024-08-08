import axios from "axios";
import type { IHeading, IStoreTags } from "../ts-interface/storeTags.type";

const memes: {name: string, description: string}[] = [
  {
    "name": "Biker",
    "description": "Come at me, bitch!"
  },
  {
    "name": "Richter",
    "description": "How's my aim, fucker?"
  },
  {
    "name": "Tony",
    "description": "Let's do this, damn it!"
  },
  {
    "name": "Rasmus",
    "description": "Nothing personal, asshole."
  },
  {
    "name": "Jake",
    "description": "Got you now, bastard!"
  },
  {
    "name": "Corey",
    "description": "Stay down, shithead!"
  },
  {
    "name": "Zack",
    "description": "Time to die, motherfucker!"
  },
  {
    "name": "Alex",
    "description": "Who's next, dickhead?"
  },
  {
    "name": "Ash",
    "description": "Out of my way, fucker!"
  },
  {
    "name": "Jacket",
    "description": "Wrong move, idiot!"
  },
  {
    "name": "Evan",
    "description": "Let's talk, dipshit."
  },
  {
    "name": "Martin",
    "description": "What's up, punk?"
  },
  {
    "name": "Tony",
    "description": "Let's roll, dumbass!"
  },
  {
    "name": "Manny",
    "description": "Bring it on, douche!"
  },
  {
    "name": "Don",
    "description": "You’re fucked!"
  },
  {
    "name": "Phil",
    "description": "Game over, prick!"
  },
  {
    "name": "Louie",
    "description": "Fuck you!"
  },
  {
    "name": "Vince",
    "description": "Eat shit!"
  },
  {
    "name": "Sam",
    "description": "Get lost, cunt!"
  },
  {
    "name": "Dex",
    "description": "Up yours!"
  },
  {
    "name": "Kurt",
    "description": "Screw you!"
  },
  {
    "name": "Chuck",
    "description": "Go to hell!"
  },
  {
    "name": "Ron",
    "description": "Get bent!"
  },
  {
    "name": "Pete",
    "description": "Fuck off!"
  },
  {
    "name": "Ray",
    "description": "Get fucked!"
  },
  {
    "name": "Duke",
    "description": "Drop dead!"
  },
  {
    "name": "Lars",
    "description": "Piss off!"
  },
  {
    "name": "Jack",
    "description": "Beat it, dick!"
  },
  {
    "name": "Gary",
    "description": "Shut up!"
  },
  {
    "name": "Seth",
    "description": "Back off!"
  },
  {
    "name": "Neil",
    "description": "Buzz off!"
  },
  {
    "name": "Troy",
    "description": "No way!"
  },
  {
    "name": "Paul",
    "description": "Nice try!"
  },
  {
    "name": "Randy",
    "description": "Too bad!"
  },
  {
    "name": "Carl",
    "description": "Game on!"
  },
  {
    "name": "Greg",
    "description": "Bite me!"
  },
  {
    "name": "Doug",
    "description": "Get real!"
  },
  {
    "name": "Steve",
    "description": "In your dreams!"
  },
  {
    "name": "Bill",
    "description": "Fat chance!"
  }
]

export const useHeadersStore = defineStore({
  id: 'headersStore',
  state: (): { headings: IHeading[], numberOfPages: number | null, currentPage: number } => ({
    headings: [],
    numberOfPages: null,
    currentPage: 1,
  }),

  actions: {
    getHeadings(page = 0, nHeadingsPerPage = 10) {
      axios.get(`/admin/v1/heading?page=${page}&nHeadingsPerPage=${nHeadingsPerPage}`)
        .then((response) => {
          const data = response.data as IStoreTags;
          this.$patch((state) => {
            state.headings = data.headings;
            state.numberOfPages = data.numberOfPages;
          })
          console.log(this.$state);
        })
        .catch(error => {
          console.warn(error);
        })
        .finally(() => {
          // TODO: ADD_LOADER
        });
    },

    postHeading(formData: { name: string, description: string }) {
      return axios.post('admin/v1/heading', formData)
        .then(() => {
          return this.getHeadings();
        })
        .catch(error => {
          console.error('Ошибка при добавлении раздела:', error);
        })
        .finally(() => {
          // TODO: ADD_LOADER
        });
    },

    startAbomination(){
      for(const meme of memes){
        setTimeout(()=>{
          this.postHeading(meme)
          .then((meme)=> {
            console.log("meme posted");
          })
          .catch((err)=>{
            console.log(err);
            
          })
        }, 200);
      }
    },

    deleteHeading(id: number) {
      axios.delete(`admin/v1/heading/${id}`)
        .then(() => {
          this.getHeadings(this.currentPage);
        })
        .catch(error => {
          console.error('Ошибка при удалении раздела:', error);
        })
        .finally(() => {
          // TODO: ADD_LOADER
        });
    }
  }
});