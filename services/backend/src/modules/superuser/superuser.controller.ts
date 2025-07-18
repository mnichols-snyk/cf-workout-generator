import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllGyms, setTermsAndConditions, toggleGymStatus } from './superuser.service';
import { SetTermsAndConditionsInput, ToggleGymStatusInput } from './superuser.schema';

export async function getAllGymsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const gyms = await getAllGyms();
    return reply.code(200).send(gyms);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return reply.code(500).send({ message: 'Error fetching gyms', error: errorMessage });
  }
}

// The `request.body`'s type is inferred from the schema in the route definition
export async function setTermsAndConditionsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    // The `request.body` is automatically validated and typed by the schema in the route
    const termsAndConditions = await setTermsAndConditions(request.body as SetTermsAndConditionsInput);
    return reply.code(200).send(termsAndConditions);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return reply.code(500).send({ message: 'Error setting terms and conditions', error: errorMessage });
  }
}

export async function toggleGymStatusHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updatedGym = await toggleGymStatus(request.body as ToggleGymStatusInput);
    return reply.code(200).send(updatedGym);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return reply.code(500).send({ message: 'Error toggling gym status', error: errorMessage });
  }
}
