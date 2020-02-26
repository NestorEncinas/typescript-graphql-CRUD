import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { Movie } from "../entity/Movie";

import { MovieInput, MovieUpdateInput } from "../graphql/inputs/movie";

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("input", () => MovieInput) input: MovieInput) {
    const movie = await Movie.create(input).save();

    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);

    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    Movie.delete({ id });

    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }
}
