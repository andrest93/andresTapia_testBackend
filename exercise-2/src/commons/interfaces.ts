  export interface OrganizationInterface {
    id?: number;
    name: string;
    status: number;
  }

  export interface TribeInterface {
    id?: number;
    organization: OrganizationInterface;
    name: string;
    status: number;
  }

  export interface RepositoryInterface {
    id?: number;
    id_tribe?: number;
    name: string;
    state: string;
    status: string;
    create_time: Date;
  }

  export interface MetricsInterface {
    id_repository?: number;
    coverage: number;
    bugs: number;
    vulnerabilities: number;
    hotspot: number;
    code_smells: number;
  }

  export interface RepositoryResponseInterface {
    repositories: RepositoryResponse[]
  }

  export interface RepositoryResponse {
        id: number;
        name: string;
        tribe: string;
        organization: string;
        coverage: string;
        codeSmells: number;
        bugs: number;
        vulnerabilities: number;
        hotstop: number;
        verificationState: string;
        state: string;
  }

  export interface VerificationStateReponseInterface {
    repositories: VerificationStateReponse[]
  }

  export interface VerificationStateReponse {
    id: number;
    state: number;
}